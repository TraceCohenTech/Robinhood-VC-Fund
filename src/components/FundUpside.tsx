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
    { year: 0, conservative: 0.97, base: 0.97, optimistic: 0.97 },
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
        subtitle="What the fund's $1B could become — net of all fees"
      />

      <div className="glass p-6 mb-6">
        <div className="space-y-3 text-[15px] text-[#6e6e73] leading-relaxed">
          <p>
            <strong className="text-[#1d1d1f]">How it's calculated:</strong> Each company's projected valuation is weighted by its share of the fund. If Databricks (22%) doubles, that adds ~0.22x to overall returns. Cash (10%) earns 4.5%. All three lines below are net of the 3.1% upfront fee and 2% annual management fee.
          </p>
          <p>
            <strong className="text-[#1d1d1f]">Three scenarios:</strong> Conservative uses sector-low multiples (markets re-rate down). Base uses growth-adjusted premiums (typical IPO). Optimistic assumes strong IPO windows for all companies.
          </p>
        </div>
      </div>

      {/* KPI row */}
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Year 3 Base', value: `${yr3?.netMultiple.toFixed(2)}x`, sub: `$${(yr3?.netNAV * 1000).toFixed(0)}M` },
          { label: 'Year 5 Base', value: `${latest?.netMultiple.toFixed(2)}x`, sub: `$${(latest?.netNAV * 1000).toFixed(0)}M` },
          { label: 'Yr 5 Conservative', value: `${latestScenario?.conservative.toFixed(2)}x`, sub: `$${(latestScenario?.conservative * 1000).toFixed(0)}M` },
          { label: 'Yr 5 Optimistic', value: `${latestScenario?.optimistic.toFixed(2)}x`, sub: `$${(latestScenario?.optimistic * 1000).toFixed(0)}M` },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass p-5 text-center"
          >
            <p className="text-[11px] font-medium text-[#aeaeb2] uppercase tracking-wider mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-[#1d1d1f] tabular-nums">{card.value}</p>
            <p className="text-sm text-[#6e6e73] mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-6"
      >
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="gradOpt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C805" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#00C805" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d1d1f" stopOpacity={0.06} />
                <stop offset="100%" stopColor="#1d1d1f" stopOpacity={0} />
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
            <Area type="monotone" dataKey="optimistic" stroke="#00C805" fill="url(#gradOpt)" strokeWidth={2} name="optimistic" dot={false} />
            <Area type="monotone" dataKey="base" stroke="#1d1d1f" fill="url(#gradBase)" strokeWidth={2.5} name="base" dot={false} />
            <Area type="monotone" dataKey="conservative" stroke="#aeaeb2" fill="none" strokeWidth={1.5} strokeDasharray="6 3" name="conservative" dot={false} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-[#6e6e73]">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-[2px] rounded bg-[#00C805]" /> Optimistic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-[2px] rounded bg-[#1d1d1f]" /> Base
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-[2px] rounded bg-[#aeaeb2]" /> Conservative
          </span>
          <span className="text-[#d1d1d6]">|</span>
          <span className="text-[#aeaeb2]">All lines net of 3.1% upfront + 2% annual fees</span>
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-[#f5f5f7]">
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">
            <strong className="text-[#1d1d1f]">Fee impact:</strong> Over 5 years, cumulative fees total ~${latest?.feesDragged.toFixed(0)}M
            on $1B AUM — that's ${((latest?.grossNAV - latest?.netNAV) * 1000).toFixed(0)}M going to fund management instead of investors.
            The range between conservative ({latestScenario?.conservative.toFixed(2)}x) and optimistic ({latestScenario?.optimistic.toFixed(2)}x) reflects
            how much exit timing and market conditions matter.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
