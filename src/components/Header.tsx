import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp.ts';
import { useInView } from '../hooks/useInView.ts';

interface HeaderProps {
  medianMOIC: number;
  loading: boolean;
}

export default function Header({ medianMOIC, loading }: HeaderProps) {
  const [ref, inView] = useInView();
  const moicCount = useCountUp({
    end: medianMOIC,
    duration: 2500,
    decimals: 2,
    enabled: inView && !loading,
  });

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-8 py-12 md:py-16 text-white animate-gradient-x"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm">
            <span className="text-xl">📊</span>
          </div>
          <span className="text-sm font-medium text-indigo-200 uppercase tracking-wider">
            Monte Carlo Analysis
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          RVI Fund Analysis
        </h1>
        <p className="text-indigo-200 text-lg mb-8 max-w-xl">
          50,000-iteration simulation of Robinhood's closed-end venture fund with correlated IPO windows, dilution risk, and fee drag.
        </p>
        <div className="inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 animate-pulse-glow">
          <span className="text-sm font-medium text-indigo-200">Median MOIC</span>
          <span className="text-4xl font-bold tabular-nums">
            {loading ? '—' : `${moicCount}x`}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
