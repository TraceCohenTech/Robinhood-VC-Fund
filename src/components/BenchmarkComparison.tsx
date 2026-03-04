import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';
import { benchmarks } from '../data/holdings.ts';
import { chartConfig } from '../utils/chartTheme.ts';
import type { SimulationResult } from '../types/index.ts';
import SectionHeader from './SectionHeader.tsx';

interface Props {
  result: SimulationResult;
}

export default function BenchmarkComparison({ result }: Props) {
  const [ref, inView] = useInView();

  const data = benchmarks.map(b =>
    b.name.startsWith('RVI')
      ? { ...b, moic: result.medianMOIC, irr: result.medianIRR * 100 }
      : { ...b }
  );

  return (
    <section>
      <SectionHeader
        title="Benchmark Comparison"
        subtitle="RVI Fund vs industry benchmarks"
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MOIC comparison */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">MOIC</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
                <CartesianGrid {...chartConfig.grid} horizontal={false} />
                <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `${v.toFixed(1)}x`} />
                <YAxis type="category" dataKey="name" {...chartConfig.axis} width={80} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={chartConfig.tooltip.contentStyle}
                  formatter={(v: number | undefined) => [`${(v ?? 0).toFixed(2)}x`, 'MOIC']}
                />
                <Bar dataKey="moic" radius={[0, 4, 4, 0]} barSize={24}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* IRR comparison */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">IRR</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
                <CartesianGrid {...chartConfig.grid} horizontal={false} />
                <XAxis type="number" {...chartConfig.axis} tickFormatter={(v: number) => `${v.toFixed(0)}%`} />
                <YAxis type="category" dataKey="name" {...chartConfig.axis} width={80} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={chartConfig.tooltip.contentStyle}
                  formatter={(v: number | undefined) => [`${(v ?? 0).toFixed(1)}%`, 'IRR']}
                />
                <Bar dataKey="irr" radius={[0, 4, 4, 0]} barSize={24}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-insight mt-2">
          <strong>Context:</strong> Cambridge Associates VC Index and Carta Late-Stage represent top-quartile venture benchmarks.
          The S&P 500 comparison uses 10-year annualized returns. RVI's closed-end structure adds illiquidity risk not captured by these benchmarks.
        </div>
      </motion.div>
    </section>
  );
}
