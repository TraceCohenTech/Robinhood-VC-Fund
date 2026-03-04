import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { chartConfig, colors } from '../utils/chartTheme.ts';
import type { FundProjection } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  projections: FundProjection[];
}

export default function FundUpside({ projections }: Props) {
  const [ref, inView] = useInView();

  const chartData = [
    { year: 0, gross: 1, net: 1 - 0.031, fees: 31 },
    ...projections.map(p => ({
      year: p.year,
      gross: p.grossMultiple,
      net: p.netMultiple,
      fees: p.feesDragged,
    })),
  ];

  const latest = projections[projections.length - 1];

  return (
    <section>
      <SectionHeader
        title="Fund NAV Projection"
        subtitle="Gross vs net returns on $1B AUM (Base scenario — 25x exit multiple)"
      />

      {/* Summary cards */}
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Year 3 Gross', value: `${projections[2]?.grossMultiple.toFixed(2)}x`, sub: `$${(projections[2]?.grossNAV * 1000).toFixed(0)}M`, color: 'text-indigo-600' },
          { label: 'Year 3 Net', value: `${projections[2]?.netMultiple.toFixed(2)}x`, sub: `$${(projections[2]?.netNAV * 1000).toFixed(0)}M`, color: 'text-violet-600' },
          { label: 'Year 5 Gross', value: `${latest?.grossMultiple.toFixed(2)}x`, sub: `$${(latest?.grossNAV * 1000).toFixed(0)}M`, color: 'text-emerald-600' },
          { label: 'Year 5 Net', value: `${latest?.netMultiple.toFixed(2)}x`, sub: `$${(latest?.netNAV * 1000).toFixed(0)}M`, color: 'text-emerald-700' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-xl p-5 transition-shadow duration-300"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{card.label}</p>
            <p className={`text-2xl md:text-3xl font-bold ${card.color} tabular-nums`}>{card.value}</p>
            <p className="text-sm text-slate-500 mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-xl p-6"
      >
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="gradGross" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.primary} stopOpacity={0.15} />
                <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.accent} stopOpacity={0.1} />
                <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
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
              formatter={(v: number | undefined, name?: string) => [
                `${(v ?? 0).toFixed(2)}x`,
                name === 'gross' ? 'Gross' : 'Net (after fees)',
              ]}
            />
            <Area type="monotone" dataKey="gross" stroke={colors.primary} fill="url(#gradGross)" strokeWidth={2.5} name="gross" dot={false} />
            <Area type="monotone" dataKey="net" stroke={colors.accent} fill="url(#gradNet)" strokeWidth={2} strokeDasharray="6 3" name="net" dot={false} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center gap-6 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: colors.primary }} /> Gross Returns
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded border-dashed" style={{ backgroundColor: colors.accent }} /> Net (after fees)
          </span>
        </div>

        <div className="chart-insight mt-4">
          <strong>Fee impact:</strong> Over 5 years, cumulative fees total ~${latest?.feesDragged.toFixed(0)}M
          on $1B AUM (3.1% upfront + 2% annual management). This reduces the gross {latest?.grossMultiple.toFixed(2)}x
          to a net {latest?.netMultiple.toFixed(2)}x — a {((latest?.grossMultiple - latest?.netMultiple) / latest?.grossMultiple * 100).toFixed(1)}% drag on total returns.
        </div>
      </motion.div>
    </section>
  );
}
