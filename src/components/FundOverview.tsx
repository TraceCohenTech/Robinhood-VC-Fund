import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import SectionHeader from './SectionHeader.tsx';

const stats = [
  { label: 'Fund Size', value: '$1B', sub: 'Assets under management' },
  { label: 'Companies', value: '7', sub: '+ 10% cash reserve' },
  { label: 'Mgmt Fee', value: '2%/yr', sub: '1% for first 6 months' },
  { label: 'Upfront Fee', value: '3.1%', sub: 'IPO underwriting fee' },
  { label: 'Carry', value: '0%', sub: 'No performance fee' },
  { label: 'Structure', value: 'Closed-End', sub: 'No redemptions' },
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
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-center py-5 px-3 glass"
            >
              <p className="text-xs font-medium text-[#6e6e73] uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1d1d1f]">{stat.value}</p>
              <p className="text-[11px] text-[#aeaeb2] mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
        <div className="glass p-6">
          <p className="text-[15px] text-[#6e6e73] leading-relaxed">
            <strong className="text-[#1d1d1f]">How closed-end funds work:</strong> Investors buy in at launch and can't redeem shares directly — you can only sell on the secondary market. The fund's net asset value (NAV) is driven entirely by the underlying companies. Share price may trade at a premium or discount to NAV. This analysis focuses on NAV — what the portfolio companies are actually worth.
          </p>
        </div>
      </div>
    </section>
  );
}
