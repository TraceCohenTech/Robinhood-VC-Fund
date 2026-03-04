import type { Holding, ProjectionScenario } from '../types/index.ts';

export const FUND_AUM = 1.0; // $1B

// Fee structure
export const UPFRONT_FEE = 0.031;       // 3.1% IPO underwriting fee
export const MGMT_FEE_YEAR1_H1 = 0.01;  // 1% annualized for first 6 months
export const MGMT_FEE_ONGOING = 0.02;   // 2% annual management fee

export const CASH_WEIGHT = 10; // 10% in cash

export const holdings: Holding[] = [
  {
    name: 'Stripe',
    sector: 'Fintech',
    weight: 20,
    currentValuation: 91.5,
    revenue: 18000,
    revenueGrowth: 25,
    currentMultiple: 5.1,
    color: '#6366f1',
    note: 'Profitable since 2024. Dominant in online payments infrastructure.',
  },
  {
    name: 'SpaceX',
    sector: 'Aerospace',
    weight: 18,
    currentValuation: 350,
    revenue: 9000,
    revenueGrowth: 40,
    currentMultiple: 38.9,
    color: '#8b5cf6',
    note: 'Starlink driving revenue acceleration. Defense contracts expanding.',
  },
  {
    name: 'Databricks',
    sector: 'Data/AI',
    weight: 15,
    currentValuation: 62,
    revenue: 4800,
    revenueGrowth: 55,
    currentMultiple: 12.9,
    note: '~140% net retention. 73% of growth from existing account expansion.',
    color: '#3b82f6',
  },
  {
    name: 'Klarna',
    sector: 'Fintech',
    weight: 12,
    currentValuation: 14.6,
    revenue: 2500,
    revenueGrowth: 20,
    currentMultiple: 5.8,
    color: '#ec4899',
    note: 'Filed for IPO. Path to profitability via AI cost reduction.',
  },
  {
    name: 'Fanatics',
    sector: 'E-Commerce',
    weight: 10,
    currentValuation: 31,
    revenue: 8000,
    revenueGrowth: 12,
    currentMultiple: 3.9,
    color: '#f59e0b',
    note: 'Vertically integrated: collectibles, betting, merchandise.',
  },
  {
    name: 'Discord',
    sector: 'Social/Gaming',
    weight: 8,
    currentValuation: 15,
    revenue: 700,
    revenueGrowth: 30,
    currentMultiple: 21.4,
    color: '#14b8a6',
    note: '200M+ MAU. Expanding monetization beyond Nitro subscriptions.',
  },
  {
    name: 'Plaid',
    sector: 'Fintech',
    weight: 7,
    currentValuation: 13.4,
    revenue: 500,
    revenueGrowth: 25,
    currentMultiple: 26.8,
    color: '#10b981',
    note: 'Financial data infrastructure. Expanding into credit and payments.',
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
