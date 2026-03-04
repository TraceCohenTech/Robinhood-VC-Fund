import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { scenarios } from '../data/holdings.ts';
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
        title="Company Growth Projections"
        subtitle="What each company could be worth as they continue to grow"
      />

      <div className="glass rounded-xl p-5 mb-6">
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          <strong className="text-slate-800">How to read this:</strong> For each company, we project their revenue forward based on current growth rates — but with a critical adjustment. High growth rates don't last forever. A company growing 100%+ today will naturally slow as it scales, so we decay growth rates toward ~15% annually over 5 years. This is what happens in the real world.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          We then value each company at three different <strong className="text-slate-800">revenue multiples</strong> — essentially, how many times revenue the market might pay for the company. High-growth tech companies typically trade at 15–40x revenue when they IPO, depending on growth rate, margins, and market sentiment.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Valuation floor:</strong> No company is shown below its current private market valuation. These companies recently raised at these prices — the fund marks them here until public markets re-price them.
        </p>
      </div>

      {/* Year selector */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-slate-500 font-medium">Projection year:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(yr => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedYear === yr
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              Yr {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-xs text-slate-500">
        {scenarios.map(s => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              s.label === 'Conservative' ? 'bg-slate-400' :
              s.label === 'Base' ? 'bg-indigo-500' : 'bg-emerald-500'
            }`} />
            {s.label} ({s.exitMultiple}x revenue) — {s.description.toLowerCase()}
          </span>
        ))}
      </div>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projections.map((cp, i) => {
          const yearData = cp.years.find(y => y.year === selectedYear)!;
          const isFloored = yearData.scenarios.some(
            s => s.moic === 1.0 && yearData.projectedRevenue > 0
          );
          return (
            <motion.div
              key={cp.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-xl p-5 transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: cp.color }}
                />
                <h3 className="font-bold text-slate-900 text-sm">{cp.name}</h3>
                <span className="ml-auto text-xs text-slate-400">{cp.weight}%</span>
              </div>

              {yearData.projectedRevenue > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-0.5">Projected Revenue (Yr {selectedYear})</p>
                    <p className="text-lg font-bold text-slate-900">{fmtM(yearData.projectedRevenue)}</p>
                  </div>

                  <div className="space-y-2">
                    {yearData.scenarios.map(s => (
                      <div key={s.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            s.label === 'Conservative' ? 'bg-slate-400' :
                            s.label === 'Base' ? 'bg-indigo-500' : 'bg-emerald-500'
                          }`} />
                          <span className="text-slate-500">{s.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-slate-900">{fmtB(s.valuation)}</span>
                          <span className={`ml-1.5 text-xs font-medium ${
                            s.moic >= 2 ? 'text-emerald-600' :
                            s.moic > 1 ? 'text-indigo-600' : 'text-slate-400'
                          }`}>
                            {s.moic.toFixed(1)}x
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isFloored && (
                    <p className="text-[11px] text-amber-600 mt-2">
                      * Some scenarios floored at current valuation
                    </p>
                  )}
                </>
              ) : (
                <div className="mb-2">
                  <p className="text-xs text-slate-400 mb-1">Pre-Revenue</p>
                  <p className="text-sm text-slate-500">Held at current valuation ({fmtB(cp.currentValuation)}). Revenue projections not applicable until production milestones.</p>
                </div>
              )}

              {/* Visual bar showing base case MOIC */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (yearData.scenarios[1].moic / 5) * 100)}%`,
                      backgroundColor: cp.color,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
