import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useInView } from '../hooks/useInView.ts';
import { holdings, CASH_WEIGHT } from '../data/holdings.ts';
import { chartConfig } from '../utils/chartTheme.ts';
import SectionHeader from './SectionHeader.tsx';

// Group holdings by broad sector
const sectorMap: Record<string, { color: string; companies: string[] }> = {};
holdings.forEach(h => {
  const broad = broadSector(h.sector);
  if (!sectorMap[broad]) sectorMap[broad] = { color: h.color, companies: [] };
  sectorMap[broad].companies.push(h.name);
});

function broadSector(sector: string): string {
  if (sector.includes('AI')) return 'AI & Data';
  if (sector.includes('Neobank') || sector.includes('Payments')) return 'Fintech';
  if (sector.includes('Corporate') || sector.includes('SaaS')) return 'SaaS / Software';
  if (sector.includes('Hardware') || sector.includes('Health')) return 'Consumer Hardware';
  if (sector.includes('Aerospace')) return 'Aerospace';
  return sector;
}

const sectorData = Object.entries(
  holdings.reduce<Record<string, number>>((acc, h) => {
    const s = broadSector(h.sector);
    acc[s] = (acc[s] || 0) + h.weight;
    return acc;
  }, {})
)
  .map(([name, weight]) => ({
    name,
    value: parseFloat(weight.toFixed(2)),
    color: sectorMap[name]?.color || '#d1d1d6',
    companies: sectorMap[name]?.companies || [],
  }))
  .sort((a, b) => b.value - a.value);

// Add cash
sectorData.push({
  name: 'Cash',
  value: CASH_WEIGHT,
  color: '#d1d1d6',
  companies: ['Cash & Cash Equivalents'],
});

const COLORS: Record<string, string> = {
  'AI & Data': '#6366f1',
  'Fintech': '#8b5cf6',
  'SaaS / Software': '#3b82f6',
  'Consumer Hardware': '#14b8a6',
  'Aerospace': '#ec4899',
  'Cash': '#d1d1d6',
};

export default function SectorExposure() {
  const [ref, inView] = useInView();

  return (
    <section>
      <SectionHeader
        title="Sector Exposure"
        subtitle="Where the fund's capital is allocated by industry"
      />

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Donut chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass p-6 lg:col-span-2 flex flex-col items-center justify-center"
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                animationBegin={200}
                animationDuration={800}
              >
                {sectorData.map(d => (
                  <Cell key={d.name} fill={COLORS[d.name] || d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartConfig.tooltip.contentStyle}
                formatter={(v: number | undefined, _name?: string, props?: { payload?: { name?: string; companies?: string[] } }) => {
                  const name = props?.payload?.name ?? '';
                  const companies = props?.payload?.companies ?? [];
                  return [`${(v ?? 0).toFixed(1)}%`, `${name} (${companies.join(', ')})`];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-[#d1d1d6] mt-2">Source: SEC Filing N-2 portfolio weights</p>
        </motion.div>

        {/* Sector breakdown cards */}
        <div className="lg:col-span-3 space-y-3">
          {sectorData.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass p-4 flex items-center gap-4"
            >
              <div
                className="w-3 h-10 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[s.name] || s.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-[#1d1d1f]">{s.name}</h4>
                  <span className="text-lg font-bold text-[#1d1d1f] tabular-nums ml-auto">{s.value.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-1 h-2 rounded-full overflow-hidden bg-[#f5f5f7] mb-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(s.value / 25) * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.06 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: COLORS[s.name] || s.color }}
                  />
                </div>
                <p className="text-[12px] text-[#6e6e73]">{s.companies.join(', ')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
