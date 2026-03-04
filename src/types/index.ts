export interface Holding {
  name: string;
  sector: string;
  weight: number;              // % of fund NAV
  currentValuation: number;    // $B — latest private market valuation
  revenue: number;             // $M annual run-rate
  revenueGrowth: number;       // % YoY
  currentMultiple: number;     // current valuation / revenue (implied)
  exitMultiples: {             // per-company exit multiples based on sector comps
    conservative: number;
    base: number;
    optimistic: number;
  };
  color: string;
  description: string;         // 2-3 sentence explanation of the business
  note: string;                // key metric/insight
  riskFlag?: string;           // optional risk callout
}

export interface ProjectionScenario {
  label: string;
  description: string;
}

export interface CompanyProjection {
  name: string;
  color: string;
  currentValuation: number;
  weight: number;
  riskFlag?: string;
  years: {
    year: number;
    projectedRevenue: number;  // $M
    scenarios: {
      label: string;
      valuation: number;       // $B
      moic: number;            // vs current valuation
    }[];
  }[];
}

export interface FundProjection {
  year: number;
  grossNAV: number;           // $B
  netNAV: number;             // $B after fees
  grossMultiple: number;
  netMultiple: number;
  feesDragged: number;        // $M cumulative fees
}

export interface FundScenarioProjection {
  year: number;
  conservative: number;       // net multiple
  base: number;
  optimistic: number;
}
