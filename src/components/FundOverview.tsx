import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import SectionHeader from './SectionHeader.tsx';

const stats = [
  { label: 'Fund Size', value: '$1B', sub: 'IPO at $25/share', accent: false },
  { label: 'Companies', value: '7', sub: '+ Stripe pending', accent: false },
  { label: 'Cash', value: '19.8%', sub: 'Earning ~3.7% risk-free', accent: false },
  { label: 'Mgmt Fee', value: '2%/yr', sub: '1% for first 6 months', accent: true },
  { label: 'Carry', value: '0%', sub: 'No performance fee', accent: false },
  { label: 'Upfront Fee', value: '3.1%', sub: 'IPO underwriting', accent: true },
];

export default function FundOverview() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section>
      <SectionHeader title="Fund Overview" />
      <div ref={ref} className="space-y-6">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`text-center py-5 px-3 glass ${stat.accent ? 'ring-1 ring-[#CCFF00]/20' : ''}`}
            >
              <p className="text-xs font-medium text-[#6e6e73] uppercase tracking-wider mb-2">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.accent ? 'text-[#00C805]' : 'text-[#1d1d1f]'}`}>{stat.value}</p>
              <p className="text-[11px] text-[#aeaeb2] mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass p-6"
        >
          <div className="space-y-3 text-[15px] text-[#6e6e73] leading-relaxed">
            <p>
              <strong className="text-[#1d1d1f]">How it works:</strong> $RVI is a closed-end fund (NYSE: RVI) that launched March 6, 2025. Investors buy shares at $25 and can only sell on the secondary market — no redemptions. The fund's NAV is driven by the underlying companies. Share price may trade at a premium or discount to NAV. Underwritten by Goldman Sachs.
            </p>
            <p>
              <strong className="text-[#1d1d1f]">Coming soon:</strong> RVI has entered into an agreement to acquire shares of <strong>Stripe</strong>, expected to close after the IPO. Additional companies may be added over time. Individual holdings are capped at 20% of total assets.
            </p>
          </div>
        </motion.div>
        <p className="text-[11px] text-[#aeaeb2] text-center">
          Source: <a href="https://www.sec.gov/Archives/edgar/data/2085091/000208509125000009/robinhoodventuresfundi-nx2.htm" target="_blank" rel="noopener noreferrer" className="text-[#00C805] hover:underline">SEC Filing N-2 (File No. 333-290253)</a> &middot; <a href="https://robinhood.com/us/en/newsroom/introducing-rvi/" target="_blank" rel="noopener noreferrer" className="text-[#00C805] hover:underline">Robinhood Newsroom</a>
        </p>
      </div>
    </section>
  );
}
