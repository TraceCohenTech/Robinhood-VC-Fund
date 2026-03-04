export interface Holding {
  name: string;
  ticker?: string;
  sector: string;
  weight: number;            // % of fund NAV
  lastValuation: number;     // $B
  revenue: number;           // $M annual
  revenueGrowth: number;     // % YoY
  exitMultipleLow: number;   // bear revenue multiple
  exitMultipleMid: number;   // base revenue multiple
  exitMultipleHigh: number;  // bull revenue multiple
  ipoWindowYearsLow: number;
  ipoWindowYearsMid: number;
  ipoWindowYearsHigh: number;
  dilutionProb: number;      // probability of down-round/dilution (0-1)
  dilutionMagnitude: number; // how much dilution if it happens (0-1)
  color: string;
}

export interface SimulationParams {
  iterations: number;
  bullProb: number;          // 0-0.8
  managementFee: number;     // annual, e.g. 0.015
  riskFreeRate: number;      // for cash, e.g. 0.045
  cashWeight: number;        // % of fund in cash
}

export interface CompanyResult {
  name: string;
  medianMOIC: number;
  p10MOIC: number;
  p90MOIC: number;
  medianExitYear: number;
  downRoundProb: number;
}

export interface SimulationResult {
  moicDistribution: number[];
  irrDistribution: number[];
  medianMOIC: number;
  meanMOIC: number;
  p10MOIC: number;
  p25MOIC: number;
  p75MOIC: number;
  p90MOIC: number;
  medianIRR: number;
  p10IRR: number;
  p90IRR: number;
  bullMedianMOIC: number;
  baseMedianMOIC: number;
  bullMedianIRR: number;
  baseMedianIRR: number;
  cumulativeMOIC: { year: number; p10: number; p50: number; p90: number }[];
  companyResults: CompanyResult[];
  histogram: { bin: number; count: number }[];
}

export interface Benchmark {
  name: string;
  moic: number;
  irr: number;
  color: string;
}
