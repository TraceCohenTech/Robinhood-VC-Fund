import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useInView } from '../hooks/useInView.ts';
import { holdings } from '../data/holdings.ts';
import SectionHeader from './SectionHeader.tsx';

export default function Risks() {
  const [ref, inView] = useInView();

  const top2Weight = holdings
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .reduce((s, h) => s + h.weight, 0);

  const top2Names = holdings
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map(h => h.name)
    .join(' + ');

  const preRevCount = holdings.filter(h => h.revenue === 0).length;

  const risks = [
    {
      title: 'Concentration Risk',
      description: `${top2Names} make up ${top2Weight}% of the fund. If either company stumbles — regulatory issues, growth slowdown, failed IPO — it disproportionately impacts the entire fund. A diversified VC fund typically holds 20-50+ companies, not 7.`,
      severity: 'high' as const,
    },
    {
      title: 'Liquidity Risk',
      description: `This is a closed-end fund — you can't redeem shares like an ETF. You can only sell on the secondary market, and if sentiment turns negative, shares could trade at a significant discount to NAV. There's no guarantee you can exit at fair value.`,
      severity: 'high' as const,
    },
    {
      title: 'Private Market Valuation Risk',
      description: `These companies' valuations are set by private funding rounds, not public markets. Private marks can be sticky — a company could be "worth" $134B in a funding round but trade at $80B once public markets apply their own scrutiny. The 2022 drawdown saw many late-stage companies lose 50-80% of their private valuations at IPO.`,
      severity: 'high' as const,
    },
    {
      title: 'Fee Drag',
      description: `The 3.1% upfront fee + 2% annual management fee compound to ~13-14% of AUM over 5 years. In a conservative scenario where companies grow modestly, fees eat a meaningful share of total returns. Unlike most VC funds, there's no performance fee (carry) — but the fixed management fee still applies regardless of returns.`,
      severity: 'medium' as const,
    },
    {
      title: 'Growth Deceleration',
      description: `Our model assumes growth rates decay from current levels toward ~15% over 5 years, but the actual trajectory is unknowable. Companies like Ramp (130% growth) and Oura (100% growth) are at stages where growth could decelerate much faster if they hit market saturation, competition, or execution challenges.`,
      severity: 'medium' as const,
    },
    {
      title: 'Multiple Compression at IPO',
      description: `Private market multiples often compress significantly at IPO. The "IPO pop" works both ways — in weak markets, companies regularly price below their last private valuation. Databricks at 24.8x and Ramp at 32x revenue could face pressure if public market appetite for growth stocks cools.`,
      severity: 'medium' as const,
    },
    {
      title: `Pre-Revenue Exposure (${preRevCount} company)`,
      description: `Boom Supersonic is pre-revenue — its value depends entirely on successfully building, certifying, and selling a supersonic aircraft. This is a binary outcome: it either works (potentially very valuable) or it doesn't (could go to zero). At 6% of the fund, the downside is capped but the position is effectively a deep tech lottery ticket.`,
      severity: 'low' as const,
    },
    {
      title: 'IPO Window Dependency',
      description: `These companies all need to go public (or get acquired) for the fund to realize returns. If the IPO market freezes — as it did in 2022-2023 — exits get delayed, management fees keep compounding, and the fund's timeline extends. Investors can't force liquidity events.`,
      severity: 'medium' as const,
    },
  ];

  const severityColors = {
    high: 'border-l-rose-500 bg-rose-50/50',
    medium: 'border-l-amber-500 bg-amber-50/30',
    low: 'border-l-slate-400 bg-slate-50/50',
  };

  const severityLabels = {
    high: { text: 'High', color: 'text-rose-600 bg-rose-50' },
    medium: { text: 'Medium', color: 'text-amber-600 bg-amber-50' },
    low: { text: 'Lower', color: 'text-slate-500 bg-slate-100' },
  };

  return (
    <section>
      <SectionHeader
        title="Risks & Considerations"
        subtitle="What could go wrong — and what to watch for"
      />
      <div className="glass rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Important context:</strong> This analysis projects optimistic, base, and conservative scenarios — but all projections assume these companies continue to execute well. In reality, any of these companies could face unexpected challenges: regulatory scrutiny, competitive disruption, management turnover, or macroeconomic shocks. The scenarios below do not model company failure (going to zero), which is a real risk in pre-IPO investing.
          </p>
        </div>
      </div>
      <div ref={ref} className="space-y-3">
        {risks.map((risk, i) => (
          <motion.div
            key={risk.title}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`rounded-xl p-5 border-l-4 ${severityColors[risk.severity]} transition-shadow duration-300`}
          >
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-slate-900 text-sm">{risk.title}</h3>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${severityLabels[risk.severity].color}`}>
                {severityLabels[risk.severity].text}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{risk.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
