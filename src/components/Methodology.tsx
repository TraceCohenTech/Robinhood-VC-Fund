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
    title: 'How This Works',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          This dashboard projects the potential value of Robinhood's RVI closed-end fund based on the
          fundamentals of its 7 portfolio companies. For each company, we take current revenue, grow it
          forward at its current YoY growth rate, and apply three exit multiple scenarios.
        </p>
        <p>
          The fund-level NAV is the weighted sum of each company's projected valuation (based on portfolio
          concentration) plus cash earning a risk-free rate. Net returns subtract the actual RVI fee structure.
        </p>
      </div>
    ),
  },
  {
    title: 'Fee Structure',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p><strong>Upfront IPO underwriting fee:</strong> 3.1% deducted from initial AUM at fund inception.</p>
        <p><strong>Management fee:</strong> 1% annualized for the first 6 months, then 2% annually ongoing.</p>
        <p><strong>Carried interest:</strong> None (0%). Robinhood does not charge performance fees on this fund.</p>
        <p>
          Over a 5-year holding period, total fees amount to approximately 13-14% of initial AUM,
          creating meaningful drag especially on moderate return scenarios.
        </p>
      </div>
    ),
  },
  {
    title: 'Exit Multiple Scenarios',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p><strong>Conservative (15x revenue):</strong> Assumes multiple compression at IPO. Comparable to mature SaaS companies trading at normalized valuations.</p>
        <p><strong>Base (25x revenue):</strong> Growth-adjusted premium typical of high-growth tech IPOs. Reflects companies sustaining 20-50%+ revenue growth at scale.</p>
        <p><strong>Optimistic (40x revenue):</strong> Strong IPO window with premium multiples for category-defining companies. Comparable to Snowflake, Datadog at peak valuations.</p>
        <p>
          Current private market multiples for these companies range from ~4-39x revenue,
          reflecting varied stages and sectors. Public market re-rating at IPO could expand or compress these multiples significantly.
        </p>
      </div>
    ),
  },
  {
    title: 'Data Sources',
    content: (
      <ul className="space-y-1.5 text-sm text-slate-600">
        <li><a href="https://www.sec.gov/cgi-bin/browse-edgar?company=robinhood&CIK=&type=&dateb=&owner=include&count=40" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">SEC EDGAR — Robinhood Filings</a></li>
        <li><a href="https://pitchbook.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">PitchBook — Private Market Valuations</a></li>
        <li><a href="https://www.cbinsights.com/research-unicorn-companies" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">CB Insights — Unicorn Tracker</a></li>
        <li><a href="https://stripe.com/newsroom" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Stripe — Press & Revenue Data</a></li>
        <li><a href="https://www.spacex.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">SpaceX — Company Information</a></li>
        <li><a href="https://www.databricks.com/company/newsroom" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Databricks — Press Releases</a></li>
        <li><a href="https://www.klarna.com/international/press/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Klarna — Press Room</a></li>
        <li><a href="https://www.fanatics.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Fanatics — Company Information</a></li>
        <li><a href="https://discord.com/company" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Discord — About</a></li>
        <li><a href="https://plaid.com/company/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Plaid — Company Information</a></li>
        <li><a href="https://fred.stlouisfed.org/series/DTB3" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">FRED — 3-Month Treasury Bill Rate</a></li>
        <li><a href="https://www.bloomberg.com/markets" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Bloomberg — Market Data</a></li>
      </ul>
    ),
  },
  {
    title: 'Disclaimers',
    content: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          This analysis is for informational and educational purposes only. It does not constitute
          investment advice, a recommendation, or an offer to buy or sell any securities.
        </p>
        <p>
          Revenue figures and growth rates are based on publicly available estimates and may differ from
          actual private figures. The fund's actual portfolio composition, weights, and terms may differ
          from those modeled here.
        </p>
        <p>
          Projections assume constant growth rates, which is unrealistic over multi-year horizons. Actual
          growth will vary. Exit multiples at IPO depend on market conditions, company performance, and
          investor sentiment — none of which can be predicted.
        </p>
      </div>
    ),
  },
];

export default function Methodology() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader title="Sources & Methodology" subtitle="Data sources, assumptions, and disclaimers" />
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
