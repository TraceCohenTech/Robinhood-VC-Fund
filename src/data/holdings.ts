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
    sector: 'AI / Data Infrastructure',
    weight: 22,
    currentValuation: 134,
    revenue: 5400,
    revenueGrowth: 65,
    currentMultiple: 24.8,
    exitMultiples: { conservative: 18, base: 28, optimistic: 40 },
    color: '#6366f1',
    description: 'Databricks provides a unified data analytics platform used by enterprises to process, store, and analyze massive datasets. They compete with Snowflake and are the primary commercial distributor of open-source Apache Spark. Their core moat is that once companies build their data pipelines on Databricks, switching costs are enormous.',
    note: 'Positive free cash flow. ~140% net retention — 73% of growth comes from existing customers spending more, not new logos.',
  },
  {
    name: 'Revolut',
    sector: 'Neobank / Fintech',
    weight: 18,
    currentValuation: 75,
    revenue: 4000,
    revenueGrowth: 72,
    currentMultiple: 18.8,
    exitMultiples: { conservative: 8, base: 14, optimistic: 22 },
    color: '#8b5cf6',
    description: 'Revolut is a digital banking app with 50M+ users globally, offering currency exchange, stock trading, crypto, and business accounts. They turned profitable in 2024 (~$1B profit) and are rapidly expanding banking licenses across Europe and the US. Revenue comes from interchange fees, subscriptions, and trading commissions.',
    note: '~$1B profit in 2024. Targeting $9B revenue by 2026. Expanding lending and trading products.',
    riskFlag: 'Neobanks historically trade at lower multiples than pure software (8-15x vs 20-40x)',
  },
  {
    name: 'Ramp',
    sector: 'Corporate Finance / SaaS',
    weight: 15,
    currentValuation: 32,
    revenue: 1000,
    revenueGrowth: 130,
    currentMultiple: 32.0,
    exitMultiples: { conservative: 15, base: 25, optimistic: 38 },
    color: '#3b82f6',
    description: 'Ramp provides corporate cards and expense management software that helps businesses control spending. They make money from interchange fees on card transactions and SaaS subscriptions. With ~50k business customers processing tens of billions in payment volume, they\'re one of the fastest-growing fintech companies in the US.',
    note: '~110-153% YoY growth. Strong free cash flow profile. Tens of billions in payment volume.',
  },
  {
    name: 'Oura',
    sector: 'Consumer Health / Hardware',
    weight: 13,
    currentValuation: 11,
    revenue: 750,
    revenueGrowth: 100,
    currentMultiple: 14.7,
    exitMultiples: { conservative: 4, base: 8, optimistic: 14 },
    color: '#14b8a6',
    description: 'Oura makes the Oura Ring, a wearable health tracker that monitors sleep, heart rate, and activity. Unlike Fitbit or Apple Watch, the ring form factor has a unique niche in the wearable market. Revenue comes from hardware sales plus a $6/month subscription for health insights. They\'ve sold 5.5M devices.',
    note: 'Revenue: $250M (2023) → $500M (2024) → $1B projected (2025). Subscription model adds recurring revenue.',
    riskFlag: 'Hardware companies typically get 4-8x revenue, not software multiples. Apple Watch is a competitive threat.',
  },
  {
    name: 'Mercor',
    sector: 'AI / Labor Marketplace',
    weight: 8,
    currentValuation: 10,
    revenue: 100,
    revenueGrowth: 200,
    currentMultiple: 100.0,
    exitMultiples: { conservative: 20, base: 35, optimistic: 55 },
    color: '#f59e0b',
    description: 'Mercor is an AI-powered recruiting and labor marketplace that matches companies with talent using machine learning. They\'re at a very early stage — high growth but limited revenue relative to valuation. The $10B valuation at ~$100M revenue implies the market is pricing in years of future hypergrowth.',
    note: 'Series C at $10B. ~$350M raised. Revenue estimates are approximate — limited public data.',
    riskFlag: 'Highest-risk position: 100x current revenue multiple. Valuation assumes sustained hypergrowth.',
  },
  {
    name: 'Airwallex',
    sector: 'Global Payments / Fintech',
    weight: 8,
    currentValuation: 8,
    revenue: 1000,
    revenueGrowth: 100,
    currentMultiple: 8.0,
    exitMultiples: { conservative: 8, base: 14, optimistic: 22 },
    color: '#10b981',
    description: 'Airwallex provides cross-border payment infrastructure for businesses — think Stripe but focused on international payments. They help companies send, receive, and manage money across borders. Revenue doubled from $500M to $1B ARR within a year, driven by expansion into US and Europe.',
    note: '60%+ gross margins. Doubled ARR in under a year. Global payments infrastructure play.',
  },
  {
    name: 'Boom Supersonic',
    sector: 'Aerospace / Deep Tech',
    weight: 6,
    currentValuation: 1.75,
    revenue: 0,
    revenueGrowth: 0,
    currentMultiple: 0,
    exitMultiples: { conservative: 0, base: 0, optimistic: 0 },
    color: '#ec4899',
    description: 'Boom Supersonic is developing the Overture, a supersonic passenger jet designed to fly at Mach 1.7 (2x the speed of current airliners). This is a pre-revenue, deep tech bet — the company won\'t generate meaningful revenue until the aircraft enters production, which is years away. Success depends on FAA certification, manufacturing scale, and airline orders.',
    note: '$700M-$1B raised. Pre-revenue. Revenue depends entirely on Overture production milestones.',
    riskFlag: 'Pre-revenue deep tech. Binary outcome: either the plane works and generates billions, or it doesn\'t.',
  },
];

// Scenario descriptions (exit multiples are now per-company)
export const scenarios: ProjectionScenario[] = [
  {
    label: 'Conservative',
    description: 'Multiple compression at IPO — markets assign sector-standard valuations',
  },
  {
    label: 'Base',
    description: 'Growth-adjusted premium — typical for high-growth companies at IPO',
  },
  {
    label: 'Optimistic',
    description: 'Strong IPO window with premium multiples for category leaders',
  },
];
