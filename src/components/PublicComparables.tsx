import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useInView } from '../hooks/useInView.ts';
import { chartConfig } from '../utils/chartTheme.ts';
import SectionHeader from './SectionHeader.tsx';

interface Comparable {
  rviCompany: string;
  rviColor: string;
  rviMultiple: number;
  comps: { ticker: string; name: string; multiple: number; marketCap: string; growth: string }[];
}

const comparables: Comparable[] = [
  {
    rviCompany: 'Databricks',
    rviColor: '#6366f1',
    rviMultiple: 24.8,
    comps: [
      { ticker: 'SNOW', name: 'Snowflake', multiple: 16.5, marketCap: '$56B', growth: '+28%' },
      { ticker: 'MDB', name: 'MongoDB', multiple: 13.2, marketCap: '$27B', growth: '+22%' },
      { ticker: 'DDOG', name: 'Datadog', multiple: 16.8, marketCap: '$38B', growth: '+26%' },
      { ticker: 'PLTR', name: 'Palantir', multiple: 52.0, marketCap: '$180B', growth: '+36%' },
    ],
  },
  {
    rviCompany: 'Revolut',
    rviColor: '#8b5cf6',
    rviMultiple: 18.8,
    comps: [
      { ticker: 'NU', name: 'Nubank', multiple: 10.5, marketCap: '$60B', growth: '+45%' },
      { ticker: 'SOFI', name: 'SoFi', multiple: 6.2, marketCap: '$15B', growth: '+30%' },
      { ticker: 'HOOD', name: 'Robinhood', multiple: 8.5, marketCap: '$35B', growth: '+40%' },
    ],
  },
  {
    rviCompany: 'Ramp',
    rviColor: '#3b82f6',
    rviMultiple: 32.0,
    comps: [
      { ticker: 'BILL', name: 'Bill.com', multiple: 8.5, marketCap: '$17B', growth: '+18%' },
      { ticker: 'BREX', name: 'Brex (private)', multiple: 20.0, marketCap: '$12B est.', growth: '+50%' },
      { ticker: 'INTU', name: 'Intuit', multiple: 10.8, marketCap: '$180B', growth: '+15%' },
    ],
  },
  {
    rviCompany: 'Airwallex',
    rviColor: '#10b981',
    rviMultiple: 8.0,
    comps: [
      { ticker: 'ADYEN', name: 'Adyen', multiple: 14.5, marketCap: '$48B', growth: '+22%' },
      { ticker: 'SQ', name: 'Block (Square)', multiple: 2.8, marketCap: '$52B', growth: '+12%' },
      { ticker: 'PYPL', name: 'PayPal', multiple: 3.2, marketCap: '$75B', growth: '+8%' },
    ],
  },
  {
    rviCompany: 'Oura',
    rviColor: '#14b8a6',
    rviMultiple: 11.0,
    comps: [
      { ticker: 'GRMN', name: 'Garmin', multiple: 4.8, marketCap: '$36B', growth: '+15%' },
      { ticker: 'FIT→GOOG', name: 'Fitbit (acq.)', multiple: 3.5, marketCap: '$2.1B acq.', growth: 'N/A' },
      { ticker: 'AAPL', name: 'Apple (Wearables)', multiple: 8.2, marketCap: '$3.4T', growth: '+5%' },
    ],
  },
];

export default function PublicComparables() {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Public Market Comparables"
        subtitle="How portfolio companies compare to similar public companies"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass p-5 mb-6"
      >
        <p className="text-[15px] text-[#6e6e73] leading-relaxed">
          <strong className="text-[#1d1d1f]">Why this matters:</strong> When private companies IPO, their valuations are typically benchmarked against public peers. If a company's private multiple is much higher than its public comparables, it may face a "valuation correction" at IPO. If it's at or below, there may be room for re-rating upward. These are approximate comparisons — private companies often grow faster, which justifies higher multiples.
        </p>
      </motion.div>

      <div ref={ref} className="space-y-5">
        {comparables.map((comp, ci) => {
          const chartData = [
            { name: `${comp.rviCompany} (private)`, multiple: comp.rviMultiple, color: comp.rviColor, isRVI: true },
            ...comp.comps.map(c => ({
              name: `${c.ticker}`,
              multiple: c.multiple,
              color: '#d1d1d6',
              isRVI: false,
            })),
          ];

          return (
            <motion.div
              key={comp.rviCompany}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
              className="glass p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.rviColor }} />
                <h3 className="text-base font-bold text-[#1d1d1f]">{comp.rviCompany}</h3>
                <span className="text-sm font-bold tabular-nums" style={{ color: comp.rviColor }}>{comp.rviMultiple}x revenue</span>
                <span className="text-xs text-[#aeaeb2] ml-1">private</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar chart */}
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
                    <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `${v}x`} />
                    <YAxis type="category" dataKey="name" {...chartConfig.axis} width={80} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={chartConfig.tooltip.contentStyle}
                      formatter={(v: number | undefined) => [`${(v ?? 0).toFixed(1)}x`, 'Revenue Multiple']}
                    />
                    <Bar dataKey="multiple" radius={[0, 8, 8, 0]} maxBarSize={20}>
                      {chartData.map((d, i) => (
                        <Cell key={i} fill={d.isRVI ? d.color : '#d1d1d6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                {/* Comparable details */}
                <div className="space-y-2">
                  {comp.comps.map(c => (
                    <div key={c.ticker} className="flex items-center gap-3 text-[13px]">
                      <span className="font-mono font-bold text-[#1d1d1f] w-[52px] shrink-0">{c.ticker}</span>
                      <span className="text-[#6e6e73] flex-1">{c.name}</span>
                      <span className="text-[#1d1d1f] font-semibold tabular-nums">{c.multiple}x</span>
                      <span className="text-[#aeaeb2] text-xs w-[52px] text-right">{c.marketCap}</span>
                      <span className="text-[#00C805] text-xs font-medium w-[40px] text-right">{c.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] text-[#aeaeb2] text-center mt-4">
        Public company multiples are approximate (EV/Revenue trailing). Sources: Yahoo Finance, Meritech Capital, public filings. Market caps and multiples as of early 2026. Brex valuation is estimated from last private round.
      </p>
    </section>
  );
}
