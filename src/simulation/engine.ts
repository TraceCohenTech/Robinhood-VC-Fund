import type { CompanyProjection, FundProjection, FundScenarioProjection } from '../types/index.ts';
import {
  holdings,
  FUND_AUM,
  CASH_WEIGHT,
  UPFRONT_FEE,
  MGMT_FEE_YEAR1_H1,
  MGMT_FEE_ONGOING,
} from '../data/holdings.ts';

const PROJECTION_YEARS = [1, 2, 3, 4, 5];
const TERMINAL_GROWTH = 0.15;
const SCENARIO_KEYS = ['conservative', 'base', 'optimistic'] as const;
const SCENARIO_LABELS = ['Conservative', 'Base', 'Optimistic'];

function decayedGrowthRate(initialRate: number, year: number): number {
  const decay = 0.45;
  return TERMINAL_GROWTH + (initialRate - TERMINAL_GROWTH) * Math.pow(1 - decay, year);
}

function projectRevenue(baseRevenue: number, initialGrowthPct: number, years: number): number {
  let revenue = baseRevenue;
  const initialRate = initialGrowthPct / 100;
  for (let y = 1; y <= years; y++) {
    const rate = decayedGrowthRate(initialRate, y);
    revenue *= (1 + rate);
  }
  return revenue;
}

export function projectCompanies(): CompanyProjection[] {
  return holdings.map(h => ({
    name: h.name,
    color: h.color,
    currentValuation: h.currentValuation,
    weight: h.weight,
    riskFlag: h.riskFlag,
    years: PROJECTION_YEARS.map(yr => {
      if (h.revenue === 0) {
        return {
          year: yr,
          projectedRevenue: 0,
          scenarios: SCENARIO_LABELS.map(label => ({
            label,
            valuation: h.currentValuation,
            moic: 1.0,
          })),
        };
      }

      const projectedRevenue = projectRevenue(h.revenue, h.revenueGrowth, yr);
      return {
        year: yr,
        projectedRevenue,
        scenarios: SCENARIO_KEYS.map((key, i) => {
          const exitMult = h.exitMultiples[key];
          const rawValuation = (projectedRevenue * exitMult) / 1000;
          const valuation = Math.max(rawValuation, h.currentValuation);
          const moic = valuation / h.currentValuation;
          return {
            label: SCENARIO_LABELS[i],
            valuation,
            moic,
          };
        }),
      };
    }),
  }));
}

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

function computeFundMultiple(
  companyProjections: CompanyProjection[],
  yr: number,
  scenarioLabel: string,
): number {
  const totalWeight = holdings.reduce((s, h) => s + h.weight, 0) + CASH_WEIGHT;
  let grossMultiple = 0;

  for (const cp of companyProjections) {
    const w = cp.weight / totalWeight;
    const yearData = cp.years.find(y => y.year === yr)!;
    const scenario = yearData.scenarios.find(s => s.label === scenarioLabel)!;
    grossMultiple += scenario.moic * w;
  }

  const cashW = CASH_WEIGHT / totalWeight;
  grossMultiple += Math.pow(1.045, yr) * cashW;

  return grossMultiple;
}

export function projectFund(companyProjections: CompanyProjection[]): FundProjection[] {
  return PROJECTION_YEARS.map(yr => {
    const grossMultiple = computeFundMultiple(companyProjections, yr, 'Base');
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

export function projectFundAllScenarios(
  companyProjections: CompanyProjection[],
): FundScenarioProjection[] {
  return PROJECTION_YEARS.map(yr => {
    const totalFees = cumulativeFees(FUND_AUM, yr);
    const results: Record<string, number> = {};

    for (const label of SCENARIO_LABELS) {
      const gross = computeFundMultiple(companyProjections, yr, label);
      const net = (FUND_AUM * gross - totalFees) / FUND_AUM;
      results[label.toLowerCase()] = Number(net.toFixed(3));
    }

    return {
      year: yr,
      conservative: results['conservative'],
      base: results['base'],
      optimistic: results['optimistic'],
    };
  });
}
