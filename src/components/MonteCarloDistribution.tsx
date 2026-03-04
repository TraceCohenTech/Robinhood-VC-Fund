import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { chartConfig, colors } from '../utils/chartTheme.ts';
import type { SimulationResult } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  result: SimulationResult;
}

export default function MonteCarloDistribution({ result }: Props) {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="MOIC Distribution"
        subtitle="50,000 Monte Carlo iterations with correlated IPO windows"
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-6"
      >
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={result.histogram} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid {...chartConfig.grid} vertical={false} />
            <XAxis
              dataKey="bin"
              {...chartConfig.axis}
              tickFormatter={(v: number) => `${v.toFixed(1)}x`}
              label={{ value: 'MOIC', position: 'insideBottom', offset: -10, style: { fill: colors.textSecondary, fontSize: 12 } }}
            />
            <YAxis
              {...chartConfig.axis}
              label={{ value: 'Frequency', angle: -90, position: 'insideLeft', offset: 10, style: { fill: colors.textSecondary, fontSize: 12 } }}
            />
            <Tooltip
              contentStyle={chartConfig.tooltip.contentStyle}
              labelFormatter={(v: unknown) => `MOIC: ${Number(v).toFixed(2)}x`}
              formatter={(v: number | undefined) => [(v ?? 0).toLocaleString(), 'Iterations']}
            />
            <Bar dataKey="count" fill={colors.primary} radius={[2, 2, 0, 0]} />
            <ReferenceLine
              x={result.p10MOIC}
              stroke={colors.down}
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: `P10: ${result.p10MOIC.toFixed(2)}x`, position: 'top', fill: colors.down, fontSize: 11 }}
            />
            <ReferenceLine
              x={result.medianMOIC}
              stroke={colors.primary}
              strokeWidth={2}
              label={{ value: `P50: ${result.medianMOIC.toFixed(2)}x`, position: 'top', fill: colors.primary, fontSize: 11 }}
            />
            <ReferenceLine
              x={result.p90MOIC}
              stroke={colors.bull}
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: `P90: ${result.p90MOIC.toFixed(2)}x`, position: 'top', fill: colors.bull, fontSize: 11 }}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="chart-insight">
          <strong>Key insight:</strong> The distribution shows {result.medianMOIC >= 1 ? 'positive' : 'negative'} expected returns
          with a median of {result.medianMOIC.toFixed(2)}x. The P10-P90 spread of{' '}
          {(result.p90MOIC - result.p10MOIC).toFixed(2)}x reflects significant uncertainty in pre-IPO outcomes.
        </div>
      </motion.div>
    </section>
  );
}
