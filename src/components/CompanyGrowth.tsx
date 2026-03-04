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
        subtitle="Revenue projected forward at current growth rates, valued at different exit multiples"
      />

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
      <div className="flex items-center gap-6 mb-4 text-xs text-slate-500">
        {scenarios.map(s => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              s.label === 'Conservative' ? 'bg-slate-400' :
              s.label === 'Base' ? 'bg-indigo-500' : 'bg-emerald-500'
            }`} />
            {s.label} ({s.exitMultiple}x rev)
          </span>
        ))}
      </div>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projections.map((cp, i) => {
          const yearData = cp.years.find(y => y.year === selectedYear)!;
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
                        s.moic >= 1 ? 'text-indigo-600' : 'text-rose-600'
                      }`}>
                        {s.moic.toFixed(1)}x
                      </span>
                    </div>
                  </div>
                ))}
              </div>

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
