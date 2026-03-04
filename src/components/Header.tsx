import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-3xl rh-dark text-white"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
        {/* Left — text */}
        <div className="flex flex-col justify-center px-10 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex items-center gap-2 rh-green-bg text-black text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-black/30 animate-pulse" />
              Educational Analysis
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block"
              >
                Robinhood's
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="block rh-green"
              >
                $1B Venture Fund
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white/50 text-lg leading-relaxed max-w-md"
            >
              An independent look at the companies, valuations, and market context behind the RVI closed-end fund.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/40"
            >
              Not financial advice &middot; No affiliation with Robinhood
            </motion.div>
          </motion.div>
        </div>

        {/* Right — image */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent z-10" />
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            src="https://www.americanhumane.org/wp-content/uploads/2025/10/woexOLEkUlYsPLLuZRK6LjZaF38-1440x900.jpg"
            alt="Robin Hood"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </motion.header>
  );
}
