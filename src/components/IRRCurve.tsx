import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { chartConfig, colors } from '../utils/chartTheme.ts';
import type { SimulationResult } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  result: SimulationResult;
}

export default function IRRCurve({ result }: Props) {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Cumulative MOIC Over Time"
        subtitle="Portfolio value trajectory at P10, P50, and P90 over 12 years"
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-6"
      >
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={result.cumulativeMOIC} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="gradP90" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.bull} stopOpacity={0.15} />
                <stop offset="100%" stopColor={colors.bull} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradP50" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.primary} stopOpacity={0.2} />
                <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...chartConfig.grid} vertical={false} />
            <XAxis
              dataKey="year"
              {...chartConfig.axis}
              label={{ value: 'Years', position: 'insideBottom', offset: -10, style: { fill: colors.textSecondary, fontSize: 12 } }}
            />
            <YAxis
              {...chartConfig.axis}
              tickFormatter={(v: number) => `${v.toFixed(1)}x`}
            />
            <Tooltip
              contentStyle={chartConfig.tooltip.contentStyle}
              labelFormatter={(v: unknown) => `Year ${v}`}
              formatter={(v: number | undefined, name?: string) => [`${(v ?? 0).toFixed(2)}x`, (name ?? '').toUpperCase()]}
            />
            <Area type="monotone" dataKey="p90" stroke={colors.bull} fill="url(#gradP90)" strokeWidth={2} name="p90" dot={false} />
            <Area type="monotone" dataKey="p50" stroke={colors.primary} fill="url(#gradP50)" strokeWidth={2.5} name="p50" dot={false} />
            <Area type="monotone" dataKey="p10" stroke={colors.down} fill="none" strokeWidth={2} strokeDasharray="4 4" name="p10" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: colors.bull }} /> P90 (Bull)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: colors.primary }} /> P50 (Median)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded border-dashed" style={{ backgroundColor: colors.down }} /> P10 (Bear)
          </span>
        </div>
      </motion.div>
    </section>
  );
}
