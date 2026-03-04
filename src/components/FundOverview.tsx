import { motion } from 'framer-motion';
import { DollarSign, Percent, Building2, Clock } from 'lucide-react';
import { useInView } from '../hooks/useInView.ts';
import SectionHeader from './SectionHeader.tsx';

const cards = [
  {
    label: 'Fund AUM',
    value: '$1B',
    icon: DollarSign,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    label: 'Portfolio Companies',
    value: '7',
    detail: '+ 10% cash reserve',
    icon: Building2,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    label: 'Mgmt Fee',
    value: '2%',
    detail: '1% first 6 months',
    icon: Percent,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Structure',
    value: 'Closed-End',
    detail: '3.1% upfront IPO fee, 0% carry',
    icon: Clock,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

export default function FundOverview() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section>
      <SectionHeader title="Fund Overview" subtitle="Key terms of the RVI closed-end fund" />
      <div ref={ref} className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-xl p-5 transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {card.label}
                  </span>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${card.bg}`}>
                    <Icon size={16} className={card.color} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900">
                  {card.value}
                </div>
                {card.detail && (
                  <p className="text-xs text-slate-500 mt-1">{card.detail}</p>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">How this fund works:</strong> RVI is a closed-end fund — investors buy in at IPO and can't redeem shares directly. The fund's net asset value (NAV) is determined entirely by the performance of its underlying portfolio companies. Unlike a mutual fund, the share price on the open market may trade at a premium or discount to NAV based on supply/demand. This analysis focuses solely on NAV — what the underlying companies are actually worth — not the market price of RVI shares.
          </p>
        </div>
      </div>
    </section>
  );
}
