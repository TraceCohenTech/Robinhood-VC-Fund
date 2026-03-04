import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { holdings, CASH_WEIGHT } from '../data/holdings.ts';
import { fmtB, fmtM, fmtPct } from '../utils/formatters.ts';
import SectionHeader from './SectionHeader.tsx';

const totalWeight = holdings.reduce((s, h) => s + h.weight, 0) + CASH_WEIGHT;

export default function PortfolioComposition() {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader title="Portfolio" subtitle="What the fund owns and why it matters" />

      {/* Animated allocation bar */}
      <div className="glass p-5 mb-4">
        <div className="flex items-center gap-1 h-4 rounded-full overflow-hidden mb-4">
          {holdings.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ width: 0 }}
              animate={{ width: `${(h.weight / totalWeight) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ backgroundColor: h.color }}
              className="h-full first:rounded-l-full"
              title={`${h.name}: ${h.weight}%`}
            />
          ))}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(CASH_WEIGHT / totalWeight) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.2 + holdings.length * 0.08 }}
            className="h-full bg-[#d1d1d6] rounded-r-full"
            title={`Cash: ${CASH_WEIGHT}%`}
          />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#6e6e73]">
          {holdings.map(h => (
            <span key={h.name} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: h.color }} />
              {h.name} <span className="font-semibold text-[#1d1d1f]">{h.weight}%</span>
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d1d1d6]" />
            Cash <span className="font-semibold text-[#1d1d1f]">{CASH_WEIGHT}%</span>
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass p-5 mb-6"
      >
        <p className="text-[15px] text-[#6e6e73] leading-relaxed">
          <strong className="text-[#1d1d1f]">Reading the cards below:</strong> Valuation is what investors paid in the latest funding round. Revenue is the annual run-rate. Growth is year-over-year. The revenue multiple (valuation / revenue) shows how much investors pay per dollar of revenue — higher multiples typically mean faster growth or stronger competitive moats.
        </p>
      </motion.div>

      {/* Company cards */}
      <div ref={ref} className="space-y-3">
        {holdings.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="glass p-6 border-l-4"
            style={{ borderLeftColor: h.color }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-[#1d1d1f]">{h.name}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: `${h.color}15`, color: h.color }}>
                    {h.sector}
                  </span>
                  <span className="ml-auto text-sm font-bold text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1 rounded-lg">{h.weight}%</span>
                </div>
                <p className="text-[13px] text-[#6e6e73] leading-relaxed mb-4">{h.description}</p>

                {h.revenue > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Stat label="Valuation" value={fmtB(h.currentValuation)} />
                    <Stat label="Revenue" value={fmtM(h.revenue)} />
                    <Stat label="YoY Growth" value={`+${fmtPct(h.revenueGrowth)}`} highlight />
                    <Stat label="Rev Multiple" value={`${h.currentMultiple.toFixed(1)}x`} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Stat label="Valuation" value={fmtB(h.currentValuation)} />
                    <Stat label="Stage" value="Pre-Revenue" />
                  </div>
                )}

                {h.note && (
                  <p className="text-xs text-[#6e6e73] mt-3 px-3 py-2 bg-[#f5f5f7] rounded-lg">{h.note}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Cash */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: holdings.length * 0.07 }}
          className="glass p-6 border-l-4 border-l-[#d1d1d6]"
        >
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">Cash Reserve</h3>
              <p className="text-[13px] text-[#6e6e73]">{CASH_WEIGHT}% of fund — earning ~4.5% annualized risk-free rate</p>
            </div>
            <span className="ml-auto text-sm font-bold text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1 rounded-lg">{CASH_WEIGHT}%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-[#aeaeb2] uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`text-base font-semibold ${highlight ? 'text-[#00C805]' : 'text-[#1d1d1f]'}`}>{value}</p>
    </div>
  );
}
