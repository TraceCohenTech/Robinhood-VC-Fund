import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-3xl rh-dark text-white"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Left — text */}
        <div className="flex flex-col justify-center px-10 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rh-green-bg text-black text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6">
              Fund Analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
              RVI Fund<br />
              <span className="rh-green">Portfolio Upside</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              What could Robinhood's $1B venture fund be worth? An analysis based on company fundamentals, sector multiples, and real fee structure.
            </p>
          </motion.div>
        </div>

        {/* Right — image */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10" />
          <img
            src="https://www.americanhumane.org/wp-content/uploads/2025/10/woexOLEkUlYsPLLuZRK6LjZaF38-1440x900.jpg"
            alt="Robin Hood"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </motion.header>
  );
}
