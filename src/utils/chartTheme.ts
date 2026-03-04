export const colors = {
  primary: '#4f46e5',       // indigo-600
  primaryLight: '#6366f1',  // indigo-500
  primaryBg: '#eef2ff',     // indigo-50
  primaryBorder: '#c7d2fe', // indigo-200
  accent: '#7c3aed',        // violet-600
  accentBg: '#f5f3ff',      // violet-50
  text: '#1e293b',          // slate-800
  textSecondary: '#64748b', // slate-500
  textMuted: '#94a3b8',     // slate-400
  border: '#e2e8f0',        // slate-200
  bg: '#f5f5f7',
  cardBg: '#ffffff',
  up: '#059669',            // emerald-600
  down: '#e11d48',          // rose-600
  bull: '#059669',
  base: '#4f46e5',
  bear: '#e11d48',
};

export const chartConfig = {
  tooltip: {
    contentStyle: {
      background: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      padding: '12px 16px',
      fontSize: '13px',
    },
    labelStyle: {
      color: colors.text,
      fontWeight: 600,
      marginBottom: '4px',
    },
  },
  grid: {
    strokeDasharray: '3 3',
    stroke: '#e2e8f0',
  },
  axis: {
    tick: { fill: colors.textSecondary, fontSize: 12 },
    axisLine: false,
    tickLine: false,
  },
};
