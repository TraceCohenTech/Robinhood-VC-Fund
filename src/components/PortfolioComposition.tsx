import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useInView } from '../hooks/useInView.ts';
import { holdings, CASH_WEIGHT } from '../data/holdings.ts';
import { chartConfig } from '../utils/chartTheme.ts';
import { fmtB, fmtM, fmtPct } from '../utils/formatters.ts';
import SectionHeader from './SectionHeader.tsx';

const pieData = [
  ...holdings.map(h => ({ name: h.name, value: h.weight, color: h.color })),
  { name: 'Cash', value: CASH_WEIGHT, color: '#94a3b8' },
];

export default function PortfolioComposition() {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader title="Portfolio Composition" subtitle="7 pre-IPO companies + cash reserve" />
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl p-6 flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartConfig.tooltip.contentStyle}
                formatter={(value: number | undefined) => [`${value ?? 0}%`, 'Weight']}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {holdings.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-xl p-4 transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: h.color }}
                />
                <span className="font-semibold text-slate-900 text-sm">{h.name}</span>
                <span className="ml-auto text-xs font-medium text-slate-400">{h.weight}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>
                  <p className="text-slate-400">Valuation</p>
                  <p className="font-semibold text-slate-700">{fmtB(h.currentValuation)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Revenue</p>
                  <p className="font-semibold text-slate-700">{fmtM(h.revenue)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Growth</p>
                  <p className="font-semibold text-emerald-600">+{fmtPct(h.revenueGrowth)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Multiple</p>
                  <p className="font-semibold text-indigo-600">{h.currentMultiple.toFixed(1)}x</p>
                </div>
              </div>
              {h.note && (
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{h.note}</p>
              )}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: holdings.length * 0.06 }}
            className="glass rounded-xl p-4 flex items-center gap-3 transition-shadow duration-300"
          >
            <div className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900 text-sm">Cash Reserve</span>
              <p className="text-xs text-slate-400">{CASH_WEIGHT}% — earning ~4.5% risk-free rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
