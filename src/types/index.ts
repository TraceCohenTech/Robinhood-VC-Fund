export interface Holding {
  name: string;
  sector: string;
  weight: number;              // % of fund NAV
  currentValuation: number;    // $B — latest private market valuation
  revenue: number;             // $M annual run-rate
  revenueGrowth: number;       // % YoY
  currentMultiple: number;     // current valuation / revenue (implied)
  color: string;
  note?: string;               // key insight about the company
}

export interface ProjectionScenario {
  label: string;
  exitMultiple: number;        // revenue multiple at exit
  description: string;
}

export interface CompanyProjection {
  name: string;
  color: string;
  currentValuation: number;
  weight: number;
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
