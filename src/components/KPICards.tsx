import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart3, Zap, DollarSign, Clock } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp.ts';
import { useInView } from '../hooks/useInView.ts';
import type { SimulationResult } from '../types/index.ts';

interface KPICardsProps {
  result: SimulationResult;
}

export default function KPICards({ result }: KPICardsProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  const primaryCards = [
    {
      label: 'Median MOIC',
      value: result.medianMOIC,
      decimals: 2,
      suffix: 'x',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Median IRR',
      value: result.medianIRR * 100,
      decimals: 1,
      suffix: '%',
      icon: Target,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'P10 — P90 Range',
      value: result.p90MOIC,
      decimals: 2,
      suffix: 'x',
      prefix: `${result.p10MOIC.toFixed(2)}x — `,
      icon: BarChart3,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Bull Scenario P50',
      value: result.bullMedianMOIC,
      decimals: 2,
      suffix: 'x',
      icon: Zap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div ref={ref} className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryCards.map((card, i) => (
          <PrimaryKPI key={card.label} card={card} inView={inView} delay={i * 0.08} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SecondaryKPI
          icon={DollarSign}
          label="Mean MOIC"
          value={`${result.meanMOIC.toFixed(2)}x`}
          detail={`Skewness from outlier bull exits`}
          color="text-amber-600"
          bg="bg-amber-50"
          inView={inView}
          delay={0.4}
        />
        <SecondaryKPI
          icon={Clock}
          label="Base Scenario P50"
          value={`${result.baseMedianMOIC.toFixed(2)}x`}
          detail={`IRR: ${(result.baseMedianIRR * 100).toFixed(1)}% in non-bull markets`}
          color="text-slate-600"
          bg="bg-slate-50"
          inView={inView}
          delay={0.48}
        />
      </div>
    </div>
  );
}

function PrimaryKPI({
  card,
  inView,
  delay,
}: {
  card: {
    label: string;
    value: number;
    decimals: number;
    suffix: string;
    prefix?: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    bg: string;
  };
  inView: boolean;
  delay: number;
}) {
  const count = useCountUp({
    end: card.value,
    duration: 2000,
    decimals: card.decimals,
    delay: delay * 1000,
    enabled: inView,
  });
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-5 transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {card.label}
        </span>
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${card.bg}`}>
          <Icon size={16} className={card.color} />
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-slate-900 tabular-nums">
        {card.prefix || ''}{count}{card.suffix}
      </div>
    </motion.div>
  );
}

function SecondaryKPI({
  icon: Icon,
  label,
  value,
  detail,
  color,
  bg,
  inView,
  delay,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  detail: string;
  color: string;
  bg: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-5 flex items-center gap-4 transition-shadow duration-300"
    >
      <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${bg} shrink-0`}>
        <Icon size={20} className={color} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
        <p className="text-lg font-bold text-slate-900 truncate">{value}</p>
        <p className="text-xs text-slate-500 truncate">{detail}</p>
      </div>
    </motion.div>
  );
}
