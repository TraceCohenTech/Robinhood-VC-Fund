import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis, CartesianGrid, ReferenceLine } from 'recharts';
import { useInView } from '../hooks/useInView.ts';
import { holdings } from '../data/holdings.ts';
import { chartConfig, colors } from '../utils/chartTheme.ts';
import SectionHeader from './SectionHeader.tsx';

const valuationData = holdings.map(h => ({
  name: h.name,
  value: h.currentValuation,
  color: h.color,
}));

const revenueData = holdings
  .filter(h => h.revenue > 0)
  .map(h => ({
    name: h.name,
    value: h.revenue / 1000, // convert to $B
    color: h.color,
  }));

const multipleData = holdings
  .filter(h => h.currentMultiple > 0)
  .map(h => ({
    name: h.name,
    value: h.currentMultiple,
    color: h.color,
  }));

const growthData = holdings
  .filter(h => h.revenueGrowth > 0)
  .map(h => ({
    name: h.name,
    value: h.revenueGrowth,
    color: h.color,
  }));

// Scatter: growth rate vs revenue multiple
const scatterData = holdings
  .filter(h => h.revenue > 0 && h.currentMultiple > 0)
  .map(h => ({
    name: h.name,
    growth: h.revenueGrowth,
    multiple: h.currentMultiple,
    revenue: h.revenue,
    color: h.color,
  }));

export default function CompanyComparison() {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Company Comparison"
        subtitle="How the 7 portfolio companies stack up against each other"
      />

      <div ref={ref} className="space-y-6">
        {/* Valuation + Revenue side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass p-6"
          >
            <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Valuation</h3>
            <p className="text-[12px] text-[#aeaeb2] mb-4">Latest private market valuation ($B)</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={valuationData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 70 }}>
                <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `$${v}B`} />
                <YAxis type="category" dataKey="name" {...chartConfig.axis} width={70} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={chartConfig.tooltip.contentStyle}
                  formatter={(v: number | undefined) => [`$${v ?? 0}B`, 'Valuation']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={22}>
                  {valuationData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass p-6"
          >
            <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Annual Revenue / ARR</h3>
            <p className="text-[12px] text-[#aeaeb2] mb-4">Run-rate revenue ($B) — Boom excluded (pre-revenue)</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 70 }}>
                <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `$${v}B`} />
                <YAxis type="category" dataKey="name" {...chartConfig.axis} width={70} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={chartConfig.tooltip.contentStyle}
                  formatter={(v: number | undefined) => [`$${(v ?? 0).toFixed(1)}B`, 'Revenue']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={22}>
                  {revenueData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Growth + Multiple side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass p-6"
          >
            <h3 className="text-base font-bold text-[#1d1d1f] mb-1">YoY Revenue Growth</h3>
            <p className="text-[12px] text-[#aeaeb2] mb-4">Year-over-year growth rate (%)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={growthData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 70 }}>
                <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `${v}%`} />
                <YAxis type="category" dataKey="name" {...chartConfig.axis} width={70} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={chartConfig.tooltip.contentStyle}
                  formatter={(v: number | undefined) => [`${v ?? 0}%`, 'YoY Growth']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={22}>
                  {growthData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-6"
          >
            <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Revenue Multiple</h3>
            <p className="text-[12px] text-[#aeaeb2] mb-4">Valuation &divide; revenue — what investors pay per $1</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={multipleData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 70 }}>
                <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `${v}x`} />
                <YAxis type="category" dataKey="name" {...chartConfig.axis} width={70} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={chartConfig.tooltip.contentStyle}
                  formatter={(v: number | undefined) => [`${(v ?? 0).toFixed(1)}x`, 'Revenue Multiple']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={22}>
                  {multipleData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Growth vs Multiple scatter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass p-6"
        >
          <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Growth Rate vs. Revenue Multiple</h3>
          <p className="text-[12px] text-[#aeaeb2] mb-5">Faster-growing companies typically command higher multiples — bubble size = revenue</p>
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartConfig.grid} />
              <XAxis
                type="number"
                dataKey="growth"
                name="Growth"
                {...chartConfig.axis}
                label={{ value: 'YoY Growth (%)', position: 'insideBottom', offset: -10, style: { fill: colors.textSecondary, fontSize: 12 } }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <YAxis
                type="number"
                dataKey="multiple"
                name="Multiple"
                {...chartConfig.axis}
                label={{ value: 'Revenue Multiple', angle: -90, position: 'insideLeft', offset: 5, style: { fill: colors.textSecondary, fontSize: 12 } }}
                tickFormatter={(v: number) => `${v}x`}
              />
              <ZAxis type="number" dataKey="revenue" range={[200, 800]} />
              <Tooltip
                contentStyle={chartConfig.tooltip.contentStyle}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={chartConfig.tooltip.contentStyle}>
                      <p style={{ fontWeight: 700, marginBottom: 4, color: d.color }}>{d.name}</p>
                      <p style={{ fontSize: 12, color: '#6e6e73' }}>Growth: {d.growth}% YoY</p>
                      <p style={{ fontSize: 12, color: '#6e6e73' }}>Multiple: {d.multiple.toFixed(1)}x</p>
                      <p style={{ fontSize: 12, color: '#6e6e73' }}>Revenue: ${(d.revenue / 1000).toFixed(1)}B</p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={15}
                stroke="#aeaeb2"
                strokeDasharray="4 4"
                label={{ value: 'Median SaaS (15x)', position: 'right', style: { fill: '#aeaeb2', fontSize: 10 } }}
              />
              {scatterData.map(d => (
                <Scatter key={d.name} data={[d]} fill={d.color}>
                  <Cell fill={d.color} />
                </Scatter>
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-[#6e6e73]">
            {scatterData.map(d => (
              <span key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-[#d1d1d6] mt-3">Bubble size represents annual revenue. Dashed line = median public SaaS multiple. Sources: Company press releases, PitchBook, Crunchbase, CNBC, TechCrunch.</p>
        </motion.div>
      </div>
    </section>
  );
}
