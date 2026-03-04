export function fmtMOIC(v: number): string {
  return `${v.toFixed(2)}x`;
}

export function fmtIRR(v: number): string {
  return `${(v * 100).toFixed(1)}%`;
}

export function fmtPct(v: number): string {
  return `${v.toFixed(1)}%`;
}

export function fmtB(v: number): string {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}T`;
  if (v >= 1) return `$${v.toFixed(1)}B`;
  return `$${(v * 1000).toFixed(0)}M`;
}

export function fmtM(v: number): string {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}B`;
  return `$${v.toFixed(0)}M`;
}

export function fmtNumber(v: number): string {
  return v.toLocaleString();
}
