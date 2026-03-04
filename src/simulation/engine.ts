import type { Holding, SimulationParams, SimulationResult, CompanyResult } from '../types/index.ts';
import { holdings } from '../data/holdings.ts';

// Box-Muller transform for normal random
function randn(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function percentile(sorted: Float64Array, p: number): number {
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function sortFloat64(arr: Float64Array): Float64Array {
  const copy = new Float64Array(arr);
  copy.sort();
  return copy;
}

function simulateCompany(
  h: Holding,
  isBull: boolean,
  ipoWindowZ: number, // shared macro correlation
  params: SimulationParams,
): { moic: number; exitYear: number; diluted: boolean } {
  // Exit timing: correlated with macro IPO window
  const companyZ = 0.6 * ipoWindowZ + 0.4 * randn(); // 60% macro, 40% idiosyncratic
  const timeMean = isBull ? h.ipoWindowYearsLow + (h.ipoWindowYearsMid - h.ipoWindowYearsLow) * 0.5
    : h.ipoWindowYearsMid;
  const timeStd = (h.ipoWindowYearsHigh - h.ipoWindowYearsLow) / 4;
  let exitYear = timeMean + companyZ * timeStd;
  exitYear = Math.max(0.5, Math.min(exitYear, 12));

  // Revenue at exit
  const growthRate = h.revenueGrowth / 100;
  const growthVariance = randn() * 0.1; // +/- 10% growth uncertainty
  const effectiveGrowth = growthRate + growthVariance;
  const revenueAtExit = h.revenue * Math.pow(1 + effectiveGrowth, exitYear);

  // Exit multiple
  const multLow = h.exitMultipleLow;
  const multMid = isBull ? h.exitMultipleHigh : h.exitMultipleMid;
  const multHigh = h.exitMultipleHigh;
  const multZ = randn();
  const multMean = (multLow + multMid) / 2;
  const multStd = (multHigh - multLow) / 4;
  let exitMultiple = multMean + multZ * multStd;
  exitMultiple = Math.max(multLow * 0.5, exitMultiple);

  // Exit valuation
  let exitValuation = (revenueAtExit * exitMultiple) / 1000; // convert $M revenue * multiple to $B

  // Dilution/down-round risk
  let diluted = false;
  if (Math.random() < h.dilutionProb) {
    exitValuation *= (1 - h.dilutionMagnitude);
    diluted = true;
  }

  // MOIC = exit valuation / entry valuation
  let moic = exitValuation / h.lastValuation;

  // Fee drag: management fee compounded over holding period
  const feeMultiplier = Math.pow(1 - params.managementFee, exitYear);
  moic *= feeMultiplier;

  moic = Math.max(0, moic);

  return { moic, exitYear, diluted };
}

export function runSimulation(params: SimulationParams): SimulationResult {
  const { iterations, bullProb, riskFreeRate, cashWeight } = params;
  const totalWeight = holdings.reduce((s, h) => s + h.weight, 0) + cashWeight;

  const moicArr = new Float64Array(iterations);
  const irrArr = new Float64Array(iterations);

  // Per-company accumulators
  const companyMoics: Float64Array[] = holdings.map(() => new Float64Array(iterations));
  const companyExitYears: Float64Array[] = holdings.map(() => new Float64Array(iterations));
  const companyDilutions: Uint8Array[] = holdings.map(() => new Uint8Array(iterations));

  // Track bull vs base separately
  const bullMoics: number[] = [];
  const baseMoics: number[] = [];
  const bullIrrs: number[] = [];
  const baseIrrs: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const isBull = Math.random() < bullProb;
    const ipoWindowZ = randn(); // shared macro factor for this iteration

    let portfolioMOIC = 0;
    let weightedExitYear = 0;

    for (let j = 0; j < holdings.length; j++) {
      const h = holdings[j];
      const w = h.weight / totalWeight;
      const result = simulateCompany(h, isBull, ipoWindowZ, params);

      companyMoics[j][i] = result.moic;
      companyExitYears[j][i] = result.exitYear;
      companyDilutions[j][i] = result.diluted ? 1 : 0;

      portfolioMOIC += result.moic * w;
      weightedExitYear += result.exitYear * w;
    }

    // Cash portion earns risk-free rate
    const cashW = cashWeight / totalWeight;
    const avgHorizon = weightedExitYear / (1 - cashW); // rough average exit year
    const cashReturn = Math.pow(1 + riskFreeRate, avgHorizon);
    portfolioMOIC += cashReturn * cashW;

    moicArr[i] = portfolioMOIC;

    // IRR approximation: MOIC^(1/years) - 1
    const years = Math.max(1, weightedExitYear / (1 - cashW));
    const irr = Math.pow(Math.max(0.01, portfolioMOIC), 1 / years) - 1;
    irrArr[i] = irr;

    if (isBull) {
      bullMoics.push(portfolioMOIC);
      bullIrrs.push(irr);
    } else {
      baseMoics.push(portfolioMOIC);
      baseIrrs.push(irr);
    }
  }

  const sortedMOIC = sortFloat64(moicArr);
  const sortedIRR = sortFloat64(irrArr);

  // Histogram
  const histMin = Math.max(0, sortedMOIC[0]);
  const histMax = Math.min(sortedMOIC[sortedMOIC.length - 1], percentile(sortedMOIC, 99));
  const binCount = 50;
  const binWidth = (histMax - histMin) / binCount;
  const histogram: { bin: number; count: number }[] = [];
  for (let b = 0; b < binCount; b++) {
    histogram.push({ bin: Number((histMin + (b + 0.5) * binWidth).toFixed(3)), count: 0 });
  }
  for (let i = 0; i < iterations; i++) {
    const idx = Math.min(binCount - 1, Math.max(0, Math.floor((moicArr[i] - histMin) / binWidth)));
    histogram[idx].count++;
  }

  // Cumulative MOIC at P10/P50/P90 over years
  const cumulativeMOIC: { year: number; p10: number; p50: number; p90: number }[] = [];
  for (let yr = 0; yr <= 12; yr++) {
    if (yr === 0) {
      cumulativeMOIC.push({ year: 0, p10: 1, p50: 1, p90: 1 });
      continue;
    }
    // Approximate: interpolate MOIC at year `yr` assuming linear path to final
    const yearMoics = new Float64Array(iterations);
    for (let i = 0; i < iterations; i++) {
      let wAvgExit = 0;
      for (let j = 0; j < holdings.length; j++) {
        wAvgExit += companyExitYears[j][i] * (holdings[j].weight / totalWeight);
      }
      wAvgExit /= (1 - cashWeight / totalWeight);
      const progress = Math.min(1, yr / Math.max(1, wAvgExit));
      yearMoics[i] = 1 + (moicArr[i] - 1) * progress;
    }
    const sorted = sortFloat64(yearMoics);
    cumulativeMOIC.push({
      year: yr,
      p10: Number(percentile(sorted, 10).toFixed(3)),
      p50: Number(percentile(sorted, 50).toFixed(3)),
      p90: Number(percentile(sorted, 90).toFixed(3)),
    });
  }

  // Company results
  const companyResults: CompanyResult[] = holdings.map((h, j) => {
    const sorted = sortFloat64(companyMoics[j]);
    const exitSorted = sortFloat64(companyExitYears[j]);
    let dilCount = 0;
    for (let i = 0; i < iterations; i++) dilCount += companyDilutions[j][i];
    return {
      name: h.name,
      medianMOIC: Number(percentile(sorted, 50).toFixed(3)),
      p10MOIC: Number(percentile(sorted, 10).toFixed(3)),
      p90MOIC: Number(percentile(sorted, 90).toFixed(3)),
      medianExitYear: Number(percentile(exitSorted, 50).toFixed(1)),
      downRoundProb: Number((dilCount / iterations).toFixed(3)),
    };
  });

  // Bull/base medians
  const bullSorted = Float64Array.from(bullMoics).sort();
  const baseSorted = Float64Array.from(baseMoics).sort();
  const bullIrrSorted = Float64Array.from(bullIrrs).sort();
  const baseIrrSorted = Float64Array.from(baseIrrs).sort();

  return {
    moicDistribution: Array.from(moicArr),
    irrDistribution: Array.from(irrArr),
    medianMOIC: Number(percentile(sortedMOIC, 50).toFixed(3)),
    meanMOIC: Number((moicArr.reduce((a, b) => a + b, 0) / iterations).toFixed(3)),
    p10MOIC: Number(percentile(sortedMOIC, 10).toFixed(3)),
    p25MOIC: Number(percentile(sortedMOIC, 25).toFixed(3)),
    p75MOIC: Number(percentile(sortedMOIC, 75).toFixed(3)),
    p90MOIC: Number(percentile(sortedMOIC, 90).toFixed(3)),
    medianIRR: Number(percentile(sortedIRR, 50).toFixed(4)),
    p10IRR: Number(percentile(sortedIRR, 10).toFixed(4)),
    p90IRR: Number(percentile(sortedIRR, 90).toFixed(4)),
    bullMedianMOIC: bullSorted.length > 0 ? Number(percentile(bullSorted, 50).toFixed(3)) : 0,
    baseMedianMOIC: baseSorted.length > 0 ? Number(percentile(baseSorted, 50).toFixed(3)) : 0,
    bullMedianIRR: bullIrrSorted.length > 0 ? Number(percentile(bullIrrSorted, 50).toFixed(4)) : 0,
    baseMedianIRR: baseIrrSorted.length > 0 ? Number(percentile(baseIrrSorted, 50).toFixed(4)) : 0,
    cumulativeMOIC,
    companyResults,
    histogram,
  };
}
