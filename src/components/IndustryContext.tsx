import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useInView } from '../hooks/useInView.ts';
import { chartConfig, colors } from '../utils/chartTheme.ts';
import SectionHeader from './SectionHeader.tsx';

/* ── Data ────────────────────────────────────────────────── */

const benchmarkReturns = [
  { name: 'NASDAQ\n(10yr)', value: 15.3, color: '#00C805' },
  { name: 'Cambridge\nVC (10yr)', value: 14.2, color: '#6366f1' },
  { name: 'US PE\n(10yr)', value: 13.1, color: '#8b5cf6' },
  { name: 'Carta Late\nStage', value: 11.0, color: '#14b8a6' },
  { name: 'S&P 500\n(10yr)', value: 10.0, color: '#3b82f6' },
  { name: 'Russell\n2000', value: 7.4, color: '#f59e0b' },
];

const moicData = [
  { name: 'Top Quartile VC', value: 2.8, color: '#00C805' },
  { name: 'S&P 500 (10yr total)', value: 2.6, color: '#3b82f6' },
  { name: 'Cambridge VC Index', value: 1.8, color: '#6366f1' },
  { name: 'Carta Late-Stage', value: 1.5, color: '#14b8a6' },
  { name: 'Median VC Fund', value: 1.3, color: '#f59e0b' },
];

const revenueMultiples = [
  { sector: 'AI / GenAI (top tier)', low: 25, median: 40, high: 60, color: '#00C805' },
  { sector: 'AI / ML (median)', low: 15, median: 25, high: 35, color: '#10b981' },
  { sector: 'SaaS (top quartile)', low: 12, median: 18, high: 30, color: '#6366f1' },
  { sector: 'SaaS (median)', low: 4, median: 7, high: 12, color: '#8b5cf6' },
  { sector: 'Fintech / Payments', low: 5, median: 10, high: 20, color: '#3b82f6' },
  { sector: 'Consumer Hardware', low: 2, median: 5, high: 10, color: '#14b8a6' },
  { sector: 'Neobanks', low: 4, median: 8, high: 15, color: '#f59e0b' },
];

const ipoPerformance = [
  { name: '2021', avgReturn: 19, totalIPOs: 397, color: '#00C805' },
  { name: '2022', avgReturn: -20, totalIPOs: 71, color: '#FF5000' },
  { name: '2023', avgReturn: 14, totalIPOs: 108, color: '#00C805' },
  { name: '2024', avgReturn: 22, totalIPOs: 176, color: '#00C805' },
  { name: '2025', avgReturn: 0, totalIPOs: 26, color: '#aeaeb2' },
];

const cefDiscount = [
  { name: 'Equity CEFs', value: -8, fill: '#6366f1' },
  { name: 'Bond CEFs', value: -5, fill: '#3b82f6' },
  { name: 'Specialty CEFs', value: -12, fill: '#8b5cf6' },
  { name: 'Avg All CEFs', value: -7.5, fill: '#14b8a6' },
];

const unicornStats = [
  { label: 'Global unicorns (2024)', value: '1,200+', source: 'CB Insights' },
  { label: 'Pct that IPO above last private val', value: '~60%', source: 'CB Insights, 2023-2024' },
  { label: 'Median time Series D → IPO', value: '3.5 yrs', source: 'PitchBook, 2024' },
  { label: 'Avg IPO first-day pop (2024)', value: '+22%', source: 'Renaissance Capital' },
  { label: 'Avg lockup period post-IPO', value: '180 days', source: 'SEC Filings' },
  { label: 'Pct of IPOs profitable at listing', value: '~25%', source: 'Jay Ritter, U of Florida' },
];

const feeComps = [
  { label: 'Avg late-stage VC mgmt fee', value: '2.0%', source: 'PitchBook 2024 Fund Terms' },
  { label: 'Avg late-stage VC carried interest', value: '20%', source: 'PitchBook 2024 Fund Terms' },
  { label: 'RVI mgmt fee', value: '2.0%', highlight: true, source: 'SEC Filing N-2' },
  { label: 'RVI carry (performance fee)', value: '0%', highlight: true, source: 'SEC Filing N-2' },
  { label: 'RVI upfront underwriting fee', value: '3.1%', highlight: true, source: 'SEC Filing N-2' },
  { label: 'Avg hedge fund mgmt fee', value: '1.5%', source: 'HFR Industry Report, 2024' },
  { label: 'Avg hedge fund performance fee', value: '17.3%', source: 'HFR Industry Report, 2024' },
  { label: 'Avg mutual fund expense ratio', value: '0.5%', source: 'ICI Factbook 2024' },
];

const marketTrends = [
  { label: 'Global VC funding (2024)', value: '$345B', source: 'Crunchbase Annual Report' },
  { label: 'AI sector VC funding (2024)', value: '$131B', source: 'PitchBook, 2024' },
  { label: 'US IPO proceeds (2024)', value: '$33B', source: 'EY IPO Trends' },
  { label: 'US IPO proceeds (2025)', value: '$47.4B', source: 'EY IPO Trends' },
  { label: 'Secondary market volume (2024)', value: '$150B+', source: 'Jefferies, 2024' },
  { label: '3-month T-bill rate (current)', value: '3.7%', source: 'Federal Reserve H.15' },
  { label: 'Avg venture fund lifecycle', value: '10-12 yrs', source: 'Cambridge Associates' },
  { label: '2026 IPO pipeline forecast', value: '$55-142B', source: 'Deloitte IPO Outlook' },
];

/* ── Component ───────────────────────────────────────────── */

export default function IndustryContext() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  return (
    <section>
      <SectionHeader
        title="Industry Context"
        subtitle="Benchmarks, multiples, and market data for comparison"
      />

      {/* ── 1. Return Benchmarks ── */}
      <div ref={ref1} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="glass p-6"
        >
          <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Annualized Returns by Asset Class</h3>
          <p className="text-[12px] text-[#aeaeb2] mb-5">10-year net IRR comparison</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={benchmarkReturns} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <XAxis
                dataKey="name"
                {...chartConfig.axis}
                tick={{ fill: colors.textSecondary, fontSize: 10 }}
                interval={0}
              />
              <YAxis
                {...chartConfig.axis}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={chartConfig.tooltip.contentStyle}
                formatter={(v: number | undefined) => [`${v ?? 0}%`, 'Net IRR']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={40}>
                {benchmarkReturns.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-[#d1d1d6] mt-2">Sources: Cambridge Associates (2024), S&P Dow Jones Indices, NASDAQ, Russell</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass p-6"
        >
          <h3 className="text-base font-bold text-[#1d1d1f] mb-1">MOIC Benchmarks</h3>
          <p className="text-[12px] text-[#aeaeb2] mb-5">Multiple on invested capital — how much $1 becomes</p>
          <div className="space-y-3">
            {moicData.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: -10 }}
                animate={inView1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] text-[#1d1d1f]">{d.name}</span>
                  <span className="text-sm font-bold text-[#1d1d1f] tabular-nums">{d.value}x</span>
                </div>
                <div className="h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView1 ? { width: `${(d.value / 3.5) * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-[#d1d1d6] mt-4">Sources: Cambridge Associates (2024), Carta State of Private Markets, S&P Dow Jones</p>
        </motion.div>
      </div>

      {/* ── 2. Revenue Multiples by Sector ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-6 mb-8"
      >
        <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Public Market Revenue Multiples by Sector</h3>
        <p className="text-[12px] text-[#aeaeb2] mb-5">What investors pay per $1 of revenue — ranges reflect growth rate and margins</p>
        <div className="space-y-3">
          {revenueMultiples.map((d, i) => (
            <motion.div
              key={d.sector}
              initial={{ opacity: 0 }}
              animate={inView1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
              className="flex items-center gap-4"
            >
              <span className="text-[13px] text-[#1d1d1f] w-[160px] shrink-0">{d.sector}</span>
              <div className="flex-1 relative h-6 bg-[#f5f5f7] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0, left: 0 }}
                  animate={inView1 ? {
                    width: `${((d.high - d.low) / 65) * 100}%`,
                    left: `${(d.low / 65) * 100}%`,
                  } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
                  className="absolute h-full rounded-full opacity-80"
                  style={{ backgroundColor: d.color }}
                />
                <motion.div
                  initial={{ left: 0, opacity: 0 }}
                  animate={inView1 ? { left: `${(d.median / 65) * 100}%`, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
                  className="absolute top-0 h-full w-0.5 bg-[#1d1d1f]"
                />
              </div>
              <span className="text-xs text-[#6e6e73] tabular-nums w-[80px] text-right shrink-0">
                {d.low}x – {d.high}x
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-[11px] text-[#aeaeb2]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#6e6e73]" /> Range (low to high)</span>
          <span className="flex items-center gap-1.5"><span className="w-[1px] h-3 bg-[#1d1d1f]" /> Median</span>
        </div>
        <p className="text-[10px] text-[#d1d1d6] mt-2">Sources: Meritech Capital SaaS Index, Bessemer Cloud Index, SaaS Capital Index (Jan 2026), Finro AI Valuation Report (Q4 2025), public filings</p>
      </motion.div>

      {/* ── 3. IPO Performance + CEF Discounts ── */}
      <div ref={ref2} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="glass p-6"
        >
          <h3 className="text-base font-bold text-[#1d1d1f] mb-1">IPO Market Performance</h3>
          <p className="text-[12px] text-[#aeaeb2] mb-5">Average first-day return by year</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ipoPerformance} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" {...chartConfig.axis} />
              <YAxis {...chartConfig.axis} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip
                contentStyle={chartConfig.tooltip.contentStyle}
                formatter={(v: number | undefined, name?: string) => {
                  const labels: Record<string, string> = { avgReturn: 'Avg Return', totalIPOs: 'Total IPOs' };
                  return [name === 'avgReturn' ? `${v ?? 0}%` : v, labels[name ?? ''] ?? name];
                }}
              />
              <Bar dataKey="avgReturn" radius={[8, 8, 0, 0]} maxBarSize={50}>
                {ipoPerformance.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-3 mt-3">
            {ipoPerformance.map(d => (
              <div key={d.name} className="text-center flex-1">
                <p className="text-xs text-[#aeaeb2]">{d.name}</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">{d.totalIPOs} IPOs</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#d1d1d6] mt-3">Sources: Renaissance Capital, EY IPO Trends (2024-2025). 2025 YTD through Feb.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass p-6"
        >
          <h3 className="text-base font-bold text-[#1d1d1f] mb-1">Closed-End Fund NAV Discounts</h3>
          <p className="text-[12px] text-[#aeaeb2] mb-5">CEF shares often trade below their net asset value</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cefDiscount} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 80 }}>
              <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `${v}%`} />
              <YAxis type="category" dataKey="name" {...chartConfig.axis} width={80} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={chartConfig.tooltip.contentStyle}
                formatter={(v: number | undefined) => [`${v ?? 0}%`, 'Discount to NAV']}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={24}>
                {cefDiscount.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 rounded-xl bg-[#f5f5f7]">
            <p className="text-[12px] text-[#6e6e73] leading-relaxed">
              <strong className="text-[#1d1d1f]">Key context:</strong> Historically, closed-end funds trade at a 5-15% discount to their NAV. Share price is driven by market sentiment, not just fundamentals. This is common across all CEF types and is an important consideration for any closed-end fund investor.
            </p>
          </div>
          <p className="text-[10px] text-[#d1d1d6] mt-2">Source: Morningstar CEF Data, 2024</p>
        </motion.div>
      </div>

      {/* ── 4. Unicorn & IPO Pipeline Stats ── */}
      <div ref={ref3} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {unicornStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={inView3 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="glass p-4 text-center"
          >
            <p className="text-[10px] text-[#aeaeb2] font-medium uppercase tracking-wider mb-2 leading-tight">{s.label}</p>
            <p className="text-xl font-bold text-[#1d1d1f]">{s.value}</p>
            <p className="text-[9px] text-[#d1d1d6] mt-1">{s.source}</p>
          </motion.div>
        ))}
      </div>

      {/* ── 5. Fee Comparisons + Market Data ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#f0f0f0] bg-gradient-to-r from-[#CCFF00]/5 to-transparent">
            <h3 className="text-base font-bold text-[#1d1d1f]">Fee Comparison</h3>
            <p className="text-[12px] text-[#aeaeb2]">RVI vs industry standard fee structures</p>
          </div>
          <div className="divide-y divide-[#f5f5f7]">
            {feeComps.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0 }}
                animate={inView3 ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
                className={`flex items-center justify-between px-6 py-3 ${f.highlight ? 'bg-[#CCFF00]/5' : 'hover:bg-[#fafafa]'} transition-colors`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] ${f.highlight ? 'text-[#1d1d1f] font-semibold' : 'text-[#1d1d1f]'}`}>{f.label}</p>
                  <p className="text-[10px] text-[#d1d1d6]">{f.source}</p>
                </div>
                <p className={`text-base font-bold tabular-nums ml-4 shrink-0 ${f.highlight ? 'text-[#00C805]' : 'text-[#1d1d1f]'}`}>{f.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#f0f0f0]">
            <h3 className="text-base font-bold text-[#1d1d1f]">Market & VC Trends</h3>
            <p className="text-[12px] text-[#aeaeb2]">Current state of the venture capital market</p>
          </div>
          <div className="divide-y divide-[#f5f5f7]">
            {marketTrends.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0 }}
                animate={inView3 ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                className="flex items-center justify-between px-6 py-3 hover:bg-[#fafafa] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#1d1d1f]">{f.label}</p>
                  <p className="text-[10px] text-[#d1d1d6]">{f.source}</p>
                </div>
                <p className="text-base font-bold text-[#1d1d1f] tabular-nums ml-4 shrink-0">{f.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── 6. Key Takeaways ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass p-6"
      >
        <h3 className="text-base font-bold text-[#1d1d1f] mb-3">Key Context Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Fee Structure',
              text: 'RVI charges 2% management (industry standard) with 0% carry (vs 20% standard). The 3.1% upfront fee is the IPO underwriting cost. No carried interest is unusual — most VC funds take 20% of profits above a hurdle rate.',
              color: '#00C805',
            },
            {
              title: 'CEF Dynamics',
              text: 'Closed-end fund shares historically trade at 5-15% discounts to NAV. No redemptions — liquidity depends on secondary market. Premium or discount driven by market sentiment, not just underlying fundamentals.',
              color: '#6366f1',
            },
            {
              title: 'Venture Returns',
              text: 'Top-quartile VC funds return ~2.8x MOIC over 10 years. Median funds return ~1.3x. The spread between best and worst venture performance is wider than any other asset class — manager selection matters enormously.',
              color: '#f59e0b',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 8 }}
              animate={inView3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              className="p-4 rounded-2xl bg-[#f5f5f7]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
                <h4 className="text-sm font-bold text-[#1d1d1f]">{card.title}</h4>
              </div>
              <p className="text-[13px] text-[#6e6e73] leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
