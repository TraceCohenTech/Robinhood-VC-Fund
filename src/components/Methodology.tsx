import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader.tsx';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

const sections: AccordionItem[] = [
  {
    title: 'Model Overview',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          This dashboard runs a 50,000-iteration Monte Carlo simulation of Robinhood's RVI closed-end fund.
          The fund holds positions in 7 pre-IPO companies plus a cash reserve, and the simulation models
          each company's path to exit independently while incorporating macro-correlated IPO windows.
        </p>
        <p>
          Key model features: correlated exit timing via shared IPO window z-scores, per-company dilution
          and down-round risk, 1.5% annual management fee drag, and 4.5% risk-free return on cash.
        </p>
      </div>
    ),
  },
  {
    title: 'Data Sources',
    content: (
      <ul className="space-y-1.5 text-sm text-slate-600">
        <li>
          <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=robinhood&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">SEC EDGAR — Robinhood Filings</a>
        </li>
        <li>
          <a href="https://pitchbook.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">PitchBook — Private Market Valuations</a>
        </li>
        <li>
          <a href="https://www.cbinsights.com/research-unicorn-companies" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">CB Insights — Unicorn Tracker</a>
        </li>
        <li>
          <a href="https://www.cambridgeassociates.com/benchmark/us-venture-capital-index-and-selected-benchmark-statistics/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Cambridge Associates — VC Benchmark Index</a>
        </li>
        <li>
          <a href="https://carta.com/blog/state-of-private-markets/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Carta — State of Private Markets</a>
        </li>
        <li>
          <a href="https://www.bloomberg.com/markets" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Bloomberg — Market Data</a>
        </li>
        <li>
          <a href="https://fred.stlouisfed.org/series/DTB3" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">FRED — 3-Month Treasury Bill Rate</a>
        </li>
        <li>
          <a href="https://www.wsj.com/market-data/stocks" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Wall Street Journal — Market Data</a>
        </li>
        <li>
          <a href="https://stripe.com/newsroom" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Stripe — Press & Revenue Data</a>
        </li>
        <li>
          <a href="https://www.spacex.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">SpaceX — Company Information</a>
        </li>
        <li>
          <a href="https://www.databricks.com/company/newsroom" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Databricks — Press Releases</a>
        </li>
        <li>
          <a href="https://www.klarna.com/international/press/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Klarna — Press Room</a>
        </li>
        <li>
          <a href="https://www.fanatics.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Fanatics — Company Information</a>
        </li>
        <li>
          <a href="https://discord.com/company" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Discord — About</a>
        </li>
        <li>
          <a href="https://plaid.com/company/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Plaid — Company Information</a>
        </li>
      </ul>
    ),
  },
  {
    title: 'Model Assumptions',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p><strong>Exit multiples:</strong> Revenue-based multiples derived from comparable public company trading ranges, sector benchmarks, and growth-adjusted valuations.</p>
        <p><strong>IPO timing:</strong> Company-specific ranges based on stage, regulatory environment, and market readiness. Macro-correlated via shared z-score (60% systematic, 40% idiosyncratic).</p>
        <p><strong>Dilution:</strong> Per-company probability (5-15%) with magnitude (10-25%) reflecting late-stage down-round risk from 2022-2024 market data.</p>
        <p><strong>Fee structure:</strong> 1.5% annual management fee compounded over the holding period, applied as a multiplicative drag on returns.</p>
        <p><strong>Cash:</strong> 10% allocation earning 4.5% annualized (current 3-month T-bill proxy), compounded over the portfolio's average holding period.</p>
        <p><strong>Revenue growth:</strong> Base rates from latest reported figures with +/- 10% stochastic variance per iteration.</p>
      </div>
    ),
  },
  {
    title: 'Disclaimers',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          This analysis is for informational and educational purposes only and does not constitute investment advice,
          a recommendation, or an offer to buy or sell any securities.
        </p>
        <p>
          Past performance of benchmark indices does not guarantee future results. Monte Carlo simulations model
          probability distributions — actual outcomes may fall outside simulated ranges.
        </p>
        <p>
          Company valuations, revenue figures, and growth rates are based on publicly available estimates and
          may differ from actual private figures. The RVI fund's actual portfolio composition, weights, and
          terms may differ from those modeled here.
        </p>
        <p>
          The model does not account for: taxes, transaction costs beyond management fees, liquidity constraints,
          lock-up periods, or the specific legal structure of the closed-end fund.
        </p>
      </div>
    ),
  },
];

export default function Methodology() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader
        title="Sources & Methodology"
        subtitle="Data sources, model assumptions, and disclaimers"
      />
      <div className="space-y-3">
        {sections.map((section, i) => (
          <div key={i} className="glass rounded-xl overflow-hidden transition-shadow duration-300">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50/50 transition-colors"
            >
              <span className="font-semibold text-slate-900">{section.title}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-slate-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
