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

      {/* Compact allocation bar */}
      <div className="glass p-5 mb-4">
        <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden mb-3">
          {holdings.map(h => (
            <div
              key={h.name}
              style={{ width: `${(h.weight / totalWeight) * 100}%`, backgroundColor: h.color }}
              className="h-full first:rounded-l-full"
              title={`${h.name}: ${h.weight}%`}
            />
          ))}
          <div
            style={{ width: `${(CASH_WEIGHT / totalWeight) * 100}%` }}
            className="h-full bg-[#d1d1d6] rounded-r-full"
            title={`Cash: ${CASH_WEIGHT}%`}
          />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#6e6e73]">
          {holdings.map(h => (
            <span key={h.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
              {h.name} <span className="text-[#aeaeb2]">{h.weight}%</span>
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d1d1d6]" />
            Cash <span className="text-[#aeaeb2]">{CASH_WEIGHT}%</span>
          </span>
        </div>
      </div>

      <div className="glass p-5 mb-6">
        <p className="text-[15px] text-[#6e6e73] leading-relaxed">
          <strong className="text-[#1d1d1f]">Reading the cards below:</strong> Valuation is what investors paid in the latest funding round. Revenue is the annual run-rate. Growth is year-over-year. The revenue multiple (valuation / revenue) shows how much investors pay per dollar of revenue — higher multiples typically mean faster growth or stronger competitive moats.
        </p>
      </div>

      {/* Company cards */}
      <div ref={ref} className="space-y-3">
        {holdings.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-1 h-12 rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: h.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-[#1d1d1f]">{h.name}</h3>
                  <span className="text-xs text-[#aeaeb2] font-medium">{h.sector}</span>
                  <span className="ml-auto text-sm font-semibold text-[#1d1d1f]">{h.weight}%</span>
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
                  <p className="text-xs text-[#aeaeb2] mt-3">{h.note}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Cash */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: holdings.length * 0.05 }}
          className="glass p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 rounded-full bg-[#d1d1d6] shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">Cash Reserve</h3>
              <p className="text-[13px] text-[#6e6e73]">{CASH_WEIGHT}% of fund — earning ~4.5% annualized risk-free rate</p>
            </div>
            <span className="ml-auto text-sm font-semibold text-[#1d1d1f]">{CASH_WEIGHT}%</span>
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
