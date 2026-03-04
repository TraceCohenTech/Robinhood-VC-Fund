import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { holdings } from '../data/holdings.ts';
import { fmtB, fmtM } from '../utils/formatters.ts';
import type { CompanyProjection } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  projections: CompanyProjection[];
}

export default function CompanyGrowth({ projections }: Props) {
  const [ref, inView] = useInView();
  const [selectedYear, setSelectedYear] = useState(3);

  return (
    <section>
      <SectionHeader
        title="Growth Projections"
        subtitle="What each company could be worth as revenue grows"
      />

      <div className="glass p-6 mb-6">
        <div className="space-y-3 text-[15px] text-[#6e6e73] leading-relaxed">
          <p>
            <strong className="text-[#1d1d1f]">Revenue projection:</strong> Each company's revenue is projected forward at its current growth rate, but with natural deceleration. A company growing 100%+ today decays toward ~15% annually over 5 years — because it's harder to double from $5B than $500M.
          </p>
          <p>
            <strong className="text-[#1d1d1f]">Sector-specific multiples:</strong> Each company is valued at multiples based on what comparable public companies trade at. Data/AI platforms (18-40x) command higher multiples than neobanks (8-22x) or hardware companies (4-14x).
          </p>
          <p>
            <strong className="text-[#1d1d1f]">Valuation floor:</strong> No company shown below its most recent fundraise price.
          </p>
        </div>
      </div>

      {/* Year selector */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3, 4, 5].map(yr => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all ${
              selectedYear === yr
                ? 'rh-green-bg text-black shadow-lg shadow-[#CCFF00]/20'
                : 'glass text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            {yr}yr
          </button>
        ))}
      </div>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projections.map((cp, i) => {
          const yearData = cp.years.find(y => y.year === selectedYear)!;
          const holding = holdings.find(h => h.name === cp.name)!;
          const isFloored = yearData.scenarios.some(
            s => s.moic === 1.0 && yearData.projectedRevenue > 0
          );
          return (
            <motion.div
              key={cp.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass p-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cp.color }} />
                <h3 className="font-bold text-[#1d1d1f] text-[15px]">{cp.name}</h3>
                <span className="ml-auto text-xs text-[#aeaeb2]">{cp.weight}%</span>
              </div>
              <p className="text-[11px] text-[#aeaeb2] mb-4">{holding.sector}</p>

              {yearData.projectedRevenue > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-[11px] text-[#aeaeb2] uppercase tracking-wider mb-0.5">Projected Rev</p>
                    <p className="text-xl font-bold text-[#1d1d1f]">{fmtM(yearData.projectedRevenue)}</p>
                  </div>

                  <div className="space-y-2.5">
                    {yearData.scenarios.map((s, si) => {
                      const multKey = (['conservative', 'base', 'optimistic'] as const)[si];
                      const mult = holding.exitMultiples[multKey];
                      return (
                        <div key={s.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-[#6e6e73]">{s.label} <span className="text-[#aeaeb2]">{mult}x</span></span>
                            <span className="text-sm font-semibold text-[#1d1d1f]">
                              {fmtB(s.valuation)}
                              <span className={`ml-1.5 text-xs ${
                                s.moic >= 2 ? 'text-[#00C805]' : s.moic > 1 ? 'text-[#6e6e73]' : 'text-[#aeaeb2]'
                              }`}>
                                {s.moic.toFixed(1)}x
                              </span>
                            </span>
                          </div>
                          <div className="h-1 bg-[#f5f5f7] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${Math.min(100, (s.moic / 6) * 100)}%`,
                                backgroundColor: si === 0 ? '#d1d1d6' : si === 1 ? cp.color : '#00C805',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {isFloored && (
                    <p className="text-[10px] text-[#aeaeb2] mt-3 italic">
                      Floored at current {fmtB(cp.currentValuation)} valuation
                    </p>
                  )}
                </>
              ) : (
                <div>
                  <p className="text-[11px] text-[#aeaeb2] uppercase tracking-wider mb-1">Pre-Revenue</p>
                  <p className="text-sm text-[#6e6e73]">Held at {fmtB(cp.currentValuation)}. No revenue to project.</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
