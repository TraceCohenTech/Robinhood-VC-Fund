import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  bullProb: number;
  onBullProbChange: (v: number) => void;
  loading: boolean;
}

export default function SensitivityAnalysis({ bullProb, onBullProbChange, loading }: Props) {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Sensitivity Analysis"
        subtitle="Adjust bull market probability to see how it impacts returns"
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-8"
      >
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Bull Probability</h3>
              <p className="text-sm text-slate-500">
                Probability that markets enter a favorable IPO window
              </p>
            </div>
            <div className="flex items-center gap-3">
              {loading && (
                <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              )}
              <span className="text-3xl font-bold text-indigo-600 tabular-nums">
                {(bullProb * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={80}
            step={5}
            value={bullProb * 100}
            onChange={e => onBullProbChange(Number(e.target.value) / 100)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>0% (All base)</span>
            <span>35% (Default)</span>
            <span>80% (Very bullish)</span>
          </div>
          <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <p className="text-xs text-slate-600">
              Moving this slider re-runs the full 50,000-iteration Monte Carlo simulation.
              Higher bull probability increases expected MOIC but also widens the distribution.
              The simulation incorporates correlated IPO windows — in bull scenarios, all companies
              benefit from improved exit timing simultaneously.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
