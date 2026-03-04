import type { Holding, ProjectionScenario } from '../types/index.ts';

export const FUND_AUM = 1.0; // $1B

// Fee structure
export const UPFRONT_FEE = 0.031;       // 3.1% IPO underwriting fee
export const MGMT_FEE_YEAR1_H1 = 0.01;  // 1% annualized for first 6 months
export const MGMT_FEE_ONGOING = 0.02;   // 2% annual management fee

export const CASH_WEIGHT = 10; // 10% in cash

export const holdings: Holding[] = [
  {
    name: 'Databricks',
    sector: 'AI / Data',
    weight: 22,
    currentValuation: 134,
    revenue: 5400,
    revenueGrowth: 65,
    currentMultiple: 24.8,
    color: '#6366f1', // indigo-500
    note: 'Positive free cash flow. $14B+ raised. ~140% net retention, 73% growth from expansion.',
  },
  {
    name: 'Revolut',
    sector: 'Fintech',
    weight: 18,
    currentValuation: 75,
    revenue: 4000,
    revenueGrowth: 72,
    currentMultiple: 18.8,
    color: '#8b5cf6', // violet-500
    note: '~$1B profit. 50M+ users globally. Expanding banking licenses, lending & trading.',
  },
  {
    name: 'Ramp',
    sector: 'Fintech',
    weight: 15,
    currentValuation: 32,
    revenue: 1000,
    revenueGrowth: 130,
    currentMultiple: 32.0,
    color: '#3b82f6', // blue-500
    note: '~50k business customers. Strong free cash flow. Tens of billions in payment volume.',
  },
  {
    name: 'Oura',
    sector: 'Health / Consumer',
    weight: 13,
    currentValuation: 11,
    revenue: 750,
    revenueGrowth: 100,
    currentMultiple: 14.7,
    color: '#14b8a6', // teal-500
    note: '5.5M rings sold. Revenue: $250M (2023) → $500M (2024) → $1B projected (2025).',
  },
  {
    name: 'Mercor',
    sector: 'AI / HR',
    weight: 8,
    currentValuation: 10,
    revenue: 100,
    revenueGrowth: 200,
    currentMultiple: 100.0,
    color: '#f59e0b', // amber-500
    note: 'AI labor marketplace. Series C at $10B. ~$350M raised. Hypergrowth stage.',
  },
  {
    name: 'Airwallex',
    sector: 'Fintech',
    weight: 8,
    currentValuation: 8,
    revenue: 1000,
    revenueGrowth: 100,
    currentMultiple: 8.0,
    color: '#10b981', // emerald-500
    note: '60%+ gross margins. Doubled from $500M to $1B ARR within a year. Global payments infra.',
  },
  {
    name: 'Boom Supersonic',
    sector: 'Aerospace',
    weight: 6,
    currentValuation: 1.75,
    revenue: 0,
    revenueGrowth: 0,
    currentMultiple: 0,
    color: '#ec4899', // pink-500
    note: 'Pre-revenue. Overture supersonic jet in development. $700M–$1B raised.',
  },
];

// Three scenarios for exit multiples — these are public market multiples
// that high-growth tech companies might trade at upon IPO/exit
export const scenarios: ProjectionScenario[] = [
  {
    label: 'Conservative',
    exitMultiple: 15,
    description: 'Multiple compression — public markets re-rate to normalized levels',
  },
  {
    label: 'Base',
    exitMultiple: 25,
    description: 'Maintains growth-adjusted premium typical of high-growth tech IPOs',
  },
  {
    label: 'Optimistic',
    exitMultiple: 40,
    description: 'Strong IPO window with premium multiples for category leaders',
  },
];
