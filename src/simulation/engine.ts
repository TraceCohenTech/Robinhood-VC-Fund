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

/**
 * Project each company's revenue forward and calculate valuations
 * at different exit multiples.
 */
export function projectCompanies(): CompanyProjection[] {
  return holdings.map(h => ({
    name: h.name,
    color: h.color,
    currentValuation: h.currentValuation,
    weight: h.weight,
    years: PROJECTION_YEARS.map(yr => {
      // Pre-revenue companies: hold at current valuation (no revenue to project)
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

      const projectedRevenue = h.revenue * Math.pow(1 + h.revenueGrowth / 100, yr);
      return {
        year: yr,
        projectedRevenue,
        scenarios: scenarios.map(s => {
          const valuation = (projectedRevenue * s.exitMultiple) / 1000; // $M rev * multiple / 1000 = $B
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
  // Upfront fee on initial AUM
  let fees = aum * UPFRONT_FEE;

  // Year 1: first 6 months at 1%, second 6 months at 2%
  if (year >= 1) {
    fees += aum * (MGMT_FEE_YEAR1_H1 / 2 + MGMT_FEE_ONGOING / 2);
  }

  // Years 2+
  for (let y = 2; y <= year; y++) {
    fees += aum * MGMT_FEE_ONGOING;
  }

  return fees;
}

/**
 * Calculate fund-level NAV projections using the "Base" scenario
 * for the primary view, showing gross vs net.
 */
export function projectFund(companyProjections: CompanyProjection[]): FundProjection[] {
  const totalCompanyWeight = holdings.reduce((s, h) => s + h.weight, 0);
  const totalWeight = totalCompanyWeight + CASH_WEIGHT;

  return PROJECTION_YEARS.map(yr => {
    // Weighted average fund MOIC from company projections (using Base scenario)
    let grossMultiple = 0;

    for (const cp of companyProjections) {
      const w = cp.weight / totalWeight;
      const yearData = cp.years.find(y => y.year === yr)!;
      const baseScenario = yearData.scenarios.find(s => s.label === 'Base')!;
      grossMultiple += baseScenario.moic * w;
    }

    // Cash earns ~4.5% risk-free
    const cashW = CASH_WEIGHT / totalWeight;
    const cashReturn = Math.pow(1.045, yr);
    grossMultiple += cashReturn * cashW;

    const grossNAV = FUND_AUM * grossMultiple;

    // Net: subtract cumulative fees
    const totalFees = cumulativeFees(FUND_AUM, yr);
    const netNAV = grossNAV - totalFees;
    const netMultiple = netNAV / FUND_AUM;

    return {
      year: yr,
      grossNAV: Number(grossNAV.toFixed(3)),
      netNAV: Number(netNAV.toFixed(3)),
      grossMultiple: Number(grossMultiple.toFixed(3)),
      netMultiple: Number(netMultiple.toFixed(3)),
      feesDragged: Number((totalFees * 1000).toFixed(1)), // in $M
    };
  });
}
