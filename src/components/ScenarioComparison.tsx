import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import type { SimulationResult } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  result: SimulationResult;
  bullProb: number;
}

export default function ScenarioComparison({ result, bullProb }: Props) {
  const [ref, inView] = useInView();

  const scenarios = [
    {
      label: 'Base Case',
      prob: `${((1 - bullProb) * 100).toFixed(0)}%`,
      moic: result.baseMedianMOIC,
      irr: result.baseMedianIRR,
      color: 'from-slate-500 to-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
    {
      label: 'Bull Case',
      prob: `${(bullProb * 100).toFixed(0)}%`,
      moic: result.bullMedianMOIC,
      irr: result.bullMedianIRR,
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
  ];

  return (
    <section>
      <SectionHeader
        title="Scenario Comparison"
        subtitle="Side-by-side base vs bull market outcomes"
      />
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass rounded-xl overflow-hidden transition-shadow duration-300`}
          >
            <div className={`bg-gradient-to-r ${s.color} px-6 py-4`}>
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">{s.label}</h3>
                <span className="text-white/80 text-sm font-medium">{s.prob} probability</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-500">Median MOIC</span>
                <span className="text-3xl font-bold text-slate-900 tabular-nums">
                  {s.moic.toFixed(2)}x
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-500">Median IRR</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  {(s.irr * 100).toFixed(1)}%
                </span>
              </div>
              <div className={`${s.bg} rounded-lg p-3 border ${s.border}`}>
                <p className="text-xs text-slate-600">
                  {i === 0
                    ? 'Reflects normal market conditions with standard IPO timing and exit multiples.'
                    : 'Assumes favorable IPO windows, higher exit multiples, and faster time-to-exit.'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
