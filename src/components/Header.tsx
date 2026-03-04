import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
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
            Fund Analysis
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          RVI Fund — Portfolio Upside
        </h1>
        <p className="text-indigo-200 text-lg max-w-2xl mb-4">
          Robinhood's closed-end venture fund holds 7 high-growth private companies. This analysis projects what the fund could be worth based purely on company fundamentals — how fast they're growing, what comparable companies trade at, and how fees eat into returns.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-indigo-100">$1B AUM</span>
          <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-indigo-100">7 Pre-IPO Companies</span>
          <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-indigo-100">1–5 Year Projections</span>
          <span className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-indigo-100">Growth Decay Model</span>
        </div>
      </div>
    </motion.header>
  );
}
