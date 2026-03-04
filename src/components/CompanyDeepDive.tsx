import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { holdings } from '../data/holdings.ts';
import type { SimulationResult } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  result: SimulationResult;
}

export default function CompanyDeepDive({ result }: Props) {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Company Deep Dive"
        subtitle="Per-company exit timing, expected multiples, and down-round probability"
      />
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {result.companyResults.map((c, i) => {
          const holding = holdings.find(h => h.name === c.name);
          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-xl p-5 transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: holding?.color || '#64748b' }}
                />
                <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Median MOIC</span>
                  <span className="font-semibold text-slate-900 tabular-nums">{c.medianMOIC.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">P10 — P90</span>
                  <span className="font-medium text-slate-600 tabular-nums">
                    {c.p10MOIC.toFixed(2)}x — {c.p90MOIC.toFixed(2)}x
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Median Exit</span>
                  <span className="font-medium text-slate-600 tabular-nums">{c.medianExitYear} yrs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Down-Round Risk</span>
                  <span className={`font-medium tabular-nums ${c.downRoundProb > 0.1 ? 'text-rose-600' : 'text-slate-600'}`}>
                    {(c.downRoundProb * 100).toFixed(1)}%
                  </span>
                </div>
                {/* MOIC bar */}
                <div className="pt-1">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(100, (c.medianMOIC / 5) * 100)}%`,
                        backgroundColor: holding?.color || '#4f46e5',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
