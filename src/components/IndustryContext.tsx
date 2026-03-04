import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import SectionHeader from './SectionHeader.tsx';

const benchmarks = [
  { label: 'Cambridge Associates US VC Index (10yr)', value: '1.8x MOIC', sub: '14.2% net IRR', source: 'Cambridge Associates, 2024' },
  { label: 'Carta Late-Stage Venture (median)', value: '1.5x MOIC', sub: '11.0% net IRR', source: 'Carta State of Private Markets, 2024' },
  { label: 'S&P 500 (10yr annualized)', value: '2.6x total', sub: '~10% annualized', source: 'S&P Dow Jones Indices' },
  { label: 'Closed-End Fund Avg Discount to NAV', value: '-5% to -15%', sub: 'Shares often trade below NAV', source: 'Morningstar CEF Data' },
];

const facts = [
  { label: 'Avg late-stage VC fund management fee', value: '2.0%', source: 'PitchBook 2024 Fund Terms' },
  { label: 'Avg late-stage VC carried interest', value: '20%', source: 'PitchBook 2024 Fund Terms' },
  { label: 'Median time from Series D to IPO', value: '3.5 years', source: 'PitchBook, 2024' },
  { label: 'Pct of unicorns that IPO above last private val', value: '~60%', source: 'CB Insights, 2023-2024' },
  { label: 'Avg IPO first-day performance (2024)', value: '+22%', source: 'Renaissance Capital IPO ETF' },
  { label: 'Public SaaS revenue multiple (median, 2024)', value: '7.5x', source: 'Meritech Capital SaaS Index' },
  { label: 'Public SaaS revenue multiple (top quartile)', value: '18-35x', source: 'Meritech Capital SaaS Index' },
  { label: 'AI company revenue multiples (public, 2024)', value: '20-50x', source: 'Bessemer Cloud Index' },
];

export default function IndustryContext() {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Industry Context"
        subtitle="Benchmarks and standards for comparison"
      />

      {/* Benchmarks */}
      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {benchmarks.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass p-5"
          >
            <p className="text-[11px] text-[#aeaeb2] font-medium uppercase tracking-wider mb-3 leading-tight">{b.label}</p>
            <p className="text-2xl font-bold text-[#1d1d1f] mb-1">{b.value}</p>
            <p className="text-sm text-[#6e6e73]">{b.sub}</p>
            <p className="text-[10px] text-[#d1d1d6] mt-2">{b.source}</p>
          </motion.div>
        ))}
      </div>

      {/* Facts table */}
      <div className="glass overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f0f0]">
          <h3 className="text-base font-bold text-[#1d1d1f]">Industry Data Points</h3>
          <p className="text-[13px] text-[#aeaeb2]">Late-stage venture and public market reference points</p>
        </div>
        <div className="divide-y divide-[#f5f5f7]">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-[#fafafa] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#1d1d1f]">{f.label}</p>
                <p className="text-[11px] text-[#d1d1d6]">{f.source}</p>
              </div>
              <p className="text-base font-semibold text-[#1d1d1f] tabular-nums ml-4 shrink-0">{f.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
