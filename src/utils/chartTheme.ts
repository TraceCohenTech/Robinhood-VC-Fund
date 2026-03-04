export const colors = {
  primary: '#00C805',         // Robinhood green
  primaryBright: '#CCFF00',   // Robinhood lime
  primaryDark: '#00A004',
  accent: '#1a1a1a',          // near-black
  text: '#1d1d1f',            // Apple dark
  textSecondary: '#6e6e73',   // Apple grey
  textMuted: '#aeaeb2',
  border: '#e5e5ea',
  bg: '#f5f5f7',
  cardBg: '#ffffff',
  up: '#00C805',
  down: '#FF5000',
};

export const chartConfig = {
  tooltip: {
    contentStyle: {
      background: '#ffffff',
      border: 'none',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      padding: '14px 18px',
      fontSize: '13px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    },
    labelStyle: {
      color: colors.text,
      fontWeight: 600,
      marginBottom: '6px',
    },
  },
  grid: {
    strokeDasharray: '3 3',
    stroke: '#f0f0f0',
  },
  axis: {
    tick: { fill: colors.textSecondary, fontSize: 12 },
    axisLine: false,
    tickLine: false,
  },
};
