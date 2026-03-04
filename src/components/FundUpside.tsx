import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { chartConfig, colors } from '../utils/chartTheme.ts';
import type { FundProjection, FundScenarioProjection } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  projections: FundProjection[];
  scenarioProjections: FundScenarioProjection[];
}

export default function FundUpside({ projections, scenarioProjections }: Props) {
  const [ref, inView] = useInView();

  const chartData = [
    { year: 0, conservative: 1 - 0.031, base: 1 - 0.031, optimistic: 1 - 0.031 },
    ...scenarioProjections.map(p => ({
      year: p.year,
      conservative: p.conservative,
      base: p.base,
      optimistic: p.optimistic,
    })),
  ];

  const latest = projections[projections.length - 1];
  const yr3 = projections[2];
  const latestScenario = scenarioProjections[scenarioProjections.length - 1];

  return (
    <section>
      <SectionHeader
        title="Fund NAV Projection"
        subtitle="What the fund's $1B could be worth over 1–5 years"
      />

      <div className="glass rounded-xl p-5 mb-6">
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          <strong className="text-slate-800">How this works:</strong> The fund's NAV is the weighted sum of all company valuations based on their portfolio concentration. If Databricks (22% of fund) doubles in value, that adds ~0.22x to the fund's overall return. We aggregate all 7 companies plus cash earning 4.5% to get the total.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          <strong className="text-slate-800">Three scenarios:</strong> The chart shows all three outcomes — conservative (sector-low multiples), base (growth-adjusted premiums), and optimistic (strong IPO window). Each company uses its own sector-specific multiples, so the spread reflects real differences in how markets value fintech vs. AI vs. hardware.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Fees:</strong> All lines are net of fees — the 3.1% upfront underwriting fee deducted at inception, plus the 2% annual management fee (1% for the first 6 months). There is no performance fee (carried interest), which is actually unusual for a venture fund.
        </p>
      </div>

      {/* Summary cards — base scenario */}
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Year 3 Net', value: `${yr3?.netMultiple.toFixed(2)}x`, sub: `$${(yr3?.netNAV * 1000).toFixed(0)}M`, color: 'text-indigo-600' },
          { label: 'Year 5 Net', value: `${latest?.netMultiple.toFixed(2)}x`, sub: `$${(latest?.netNAV * 1000).toFixed(0)}M`, color: 'text-violet-600' },
          { label: 'Yr 5 Conservative', value: `${latestScenario?.conservative.toFixed(2)}x`, sub: `$${(latestScenario?.conservative * 1000).toFixed(0)}M`, color: 'text-slate-600' },
          { label: 'Yr 5 Optimistic', value: `${latestScenario?.optimistic.toFixed(2)}x`, sub: `$${(latestScenario?.optimistic * 1000).toFixed(0)}M`, color: 'text-emerald-600' },
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

      {/* Chart — all 3 scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-xl p-6"
      >
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="gradOptimistic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.primary} stopOpacity={0.15} />
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
              formatter={(v: number | undefined, name?: string) => {
                const labels: Record<string, string> = {
                  optimistic: 'Optimistic (net)',
                  base: 'Base (net)',
                  conservative: 'Conservative (net)',
                };
                return [`${(v ?? 0).toFixed(2)}x`, labels[name ?? ''] ?? name];
              }}
            />
            <Area type="monotone" dataKey="optimistic" stroke="#059669" fill="url(#gradOptimistic)" strokeWidth={2} name="optimistic" dot={false} />
            <Area type="monotone" dataKey="base" stroke={colors.primary} fill="url(#gradBase)" strokeWidth={2.5} name="base" dot={false} />
            <Area type="monotone" dataKey="conservative" stroke="#94a3b8" fill="none" strokeWidth={2} strokeDasharray="6 3" name="conservative" dot={false} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-emerald-600" /> Optimistic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ backgroundColor: colors.primary }} /> Base
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-slate-400" /> Conservative
          </span>
          <span className="text-slate-300">|</span>
          <span>All lines net of fees (3.1% upfront + 2% annual)</span>
        </div>

        <div className="chart-insight mt-4">
          <strong>Fee impact:</strong> Over 5 years, cumulative fees total ~${latest?.feesDragged.toFixed(0)}M
          on $1B AUM. In the base scenario, this reduces gross {latest?.grossMultiple.toFixed(2)}x
          to net {latest?.netMultiple.toFixed(2)}x — ${((latest?.grossNAV - latest?.netNAV) * 1000).toFixed(0)}M going to fees instead of investors.
          The spread between conservative ({latestScenario?.conservative.toFixed(2)}x) and optimistic ({latestScenario?.optimistic.toFixed(2)}x) reflects
          the wide range of outcomes depending on exit multiples at IPO.
        </div>
      </motion.div>
    </section>
  );
}
