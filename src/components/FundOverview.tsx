import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import SectionHeader from './SectionHeader.tsx';

const stats = [
  { label: 'Fund Size', value: '$1B', sub: 'Assets under management', accent: false },
  { label: 'Companies', value: '7', sub: '+ 10% cash reserve', accent: false },
  { label: 'Mgmt Fee', value: '2%/yr', sub: '1% for first 6 months', accent: true },
  { label: 'Upfront Fee', value: '3.1%', sub: 'IPO underwriting fee', accent: true },
  { label: 'Carry', value: '0%', sub: 'No performance fee', accent: false },
  { label: 'Structure', value: 'Closed-End', sub: 'No redemptions', accent: false },
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
          <p className="text-[15px] text-[#6e6e73] leading-relaxed">
            <strong className="text-[#1d1d1f]">How closed-end funds work:</strong> Investors buy in at launch and can't redeem shares directly — you can only sell on the secondary market. The fund's net asset value (NAV) is driven entirely by the underlying companies. Share price may trade at a premium or discount to NAV. This analysis focuses on the portfolio companies and their fundamentals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
