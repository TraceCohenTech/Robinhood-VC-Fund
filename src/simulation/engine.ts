import type { CompanyProjection, FundProjection } from '../types/index.ts';
import {
  holdings,
  scenarios,
  FUND_AUM,
  CASH_WEIGHT,
  UPFRONT_FEE,
  MGMT_FEE_YEAR1_H1,
  MGMT_FEE_ONGOING,
} from '../data/holdings.ts';

const PROJECTION_YEARS = [1, 2, 3, 4, 5];

// Mature terminal growth rate that all companies converge toward
const TERMINAL_GROWTH = 0.15; // 15%

/**
 * Growth rate decay: high growth rates slow as companies scale.
 * Uses exponential decay toward a terminal rate.
 *
 * E.g. Ramp at 130% → Year 1: ~85%, Year 2: ~55%, Year 3: ~38%, Year 4: ~28%, Year 5: ~22%
 * E.g. Databricks at 65% → Year 1: ~48%, Year 2: ~37%, Year 3: ~29%, Year 4: ~24%, Year 5: ~20%
 *
 * decay factor of 0.45 means ~45% of the gap to terminal closes each year
 */
function decayedGrowthRate(initialRate: number, year: number): number {
  const decay = 0.45;
  return TERMINAL_GROWTH + (initialRate - TERMINAL_GROWTH) * Math.pow(1 - decay, year);
}

/**
 * Compound revenue forward with decaying growth rates year by year.
 */
function projectRevenue(baseRevenue: number, initialGrowthPct: number, years: number): number {
  let revenue = baseRevenue;
  const initialRate = initialGrowthPct / 100;
  for (let y = 1; y <= years; y++) {
    const rate = decayedGrowthRate(initialRate, y);
    revenue *= (1 + rate);
  }
  return revenue;
}

/**
 * Project each company's revenue forward with growth decay
 * and calculate valuations at different exit multiples.
 */
export function projectCompanies(): CompanyProjection[] {
  return holdings.map(h => ({
    name: h.name,
    color: h.color,
    currentValuation: h.currentValuation,
    weight: h.weight,
    years: PROJECTION_YEARS.map(yr => {
      // Pre-revenue companies: hold at current valuation
      if (h.revenue === 0) {
        return {
          year: yr,
          projectedRevenue: 0,
          scenarios: scenarios.map(s => ({
            label: s.label,
            valuation: h.currentValuation,
            moic: 1.0,
          })),
        };
      }

      const projectedRevenue = projectRevenue(h.revenue, h.revenueGrowth, yr);
      return {
        year: yr,
        projectedRevenue,
        scenarios: scenarios.map(s => {
          const rawValuation = (projectedRevenue * s.exitMultiple) / 1000;
          // Floor: can't be valued below current raise price
          const valuation = Math.max(rawValuation, h.currentValuation);
          const moic = valuation / h.currentValuation;
          return {
            label: s.label,
            valuation,
            moic,
          };
        }),
      };
    }),
  }));
}

/**
 * Calculate cumulative management fees for a given year.
 * Year 1 H1: 1% annualized (0.5% actual), then 2% ongoing.
 * Plus 3.1% upfront IPO underwriting fee.
 */
function cumulativeFees(aum: number, year: number): number {
  let fees = aum * UPFRONT_FEE;

  if (year >= 1) {
    fees += aum * (MGMT_FEE_YEAR1_H1 / 2 + MGMT_FEE_ONGOING / 2);
  }

  for (let y = 2; y <= year; y++) {
    fees += aum * MGMT_FEE_ONGOING;
  }

  return fees;
}

/**
 * Calculate fund-level NAV projections using the "Base" scenario,
 * showing gross vs net.
 */
export function projectFund(companyProjections: CompanyProjection[]): FundProjection[] {
  const totalCompanyWeight = holdings.reduce((s, h) => s + h.weight, 0);
  const totalWeight = totalCompanyWeight + CASH_WEIGHT;

  return PROJECTION_YEARS.map(yr => {
    let grossMultiple = 0;

    for (const cp of companyProjections) {
      const w = cp.weight / totalWeight;
      const yearData = cp.years.find(y => y.year === yr)!;
      const baseScenario = yearData.scenarios.find(s => s.label === 'Base')!;
      grossMultiple += baseScenario.moic * w;
    }

    const cashW = CASH_WEIGHT / totalWeight;
    const cashReturn = Math.pow(1.045, yr);
    grossMultiple += cashReturn * cashW;

    const grossNAV = FUND_AUM * grossMultiple;
    const totalFees = cumulativeFees(FUND_AUM, yr);
    const netNAV = grossNAV - totalFees;
    const netMultiple = netNAV / FUND_AUM;

    return {
      year: yr,
      grossNAV: Number(grossNAV.toFixed(3)),
      netNAV: Number(netNAV.toFixed(3)),
      grossMultiple: Number(grossMultiple.toFixed(3)),
      netMultiple: Number(netMultiple.toFixed(3)),
      feesDragged: Number((totalFees * 1000).toFixed(1)),
    };
  });
}
