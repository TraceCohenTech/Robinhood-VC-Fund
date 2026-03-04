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
    title: 'How the Model Works',
    content: (
      <p className="text-[15px] text-[#6e6e73] leading-relaxed">
        For each company, we take current annual revenue and project it forward 1–5 years using the current YoY growth rate, with exponential decay toward a 15% terminal growth rate. This reflects the reality that high growth slows as companies scale. We then apply sector-specific revenue multiples to get projected valuations. The fund NAV is the weighted sum of all company valuations (by portfolio concentration) plus cash earning a risk-free rate. All projections are shown net of fees.
      </p>
    ),
  },
  {
    title: 'Fee Structure',
    content: (
      <div className="space-y-2 text-[15px] text-[#6e6e73] leading-relaxed">
        <p><strong className="text-[#1d1d1f]">Upfront:</strong> 3.1% IPO underwriting fee deducted at inception.</p>
        <p><strong className="text-[#1d1d1f]">Management:</strong> 1% annualized for the first 6 months, then 2% annually.</p>
        <p><strong className="text-[#1d1d1f]">Carry:</strong> 0%. No performance fee — unusual for venture funds where 20% carry is standard.</p>
      </div>
    ),
  },
  {
    title: 'Data Sources',
    content: (
      <ul className="space-y-1.5 text-[14px] text-[#6e6e73]">
        {[
          ['SEC EDGAR — Robinhood Filings', 'https://www.sec.gov/cgi-bin/browse-edgar?company=robinhood&CIK=&type=&dateb=&owner=include&count=40'],
          ['PitchBook — Private Market Valuations', 'https://pitchbook.com'],
          ['CB Insights — Unicorn Tracker', 'https://www.cbinsights.com/research-unicorn-companies'],
          ['Cambridge Associates — VC Benchmark Index', 'https://www.cambridgeassociates.com/benchmark/us-venture-capital-index-and-selected-benchmark-statistics/'],
          ['Carta — State of Private Markets', 'https://carta.com/blog/state-of-private-markets/'],
          ['FRED — 3-Month Treasury Bill Rate', 'https://fred.stlouisfed.org/series/DTB3'],
          ['Meritech Capital — SaaS Index', 'https://www.meritechcapital.com/benchmarking'],
          ['Bessemer — Cloud Index', 'https://www.bvp.com/bvp-nasdaq-emerging-cloud-index'],
          ['Renaissance Capital — IPO Data', 'https://www.renaissancecapital.com/'],
        ].map(([text, url]) => (
          <li key={text}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#00C805] hover:underline">{text}</a>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Disclaimers',
    content: (
      <div className="space-y-2 text-[15px] text-[#6e6e73] leading-relaxed">
        <p>This analysis is for educational purposes only. It does not constitute investment advice or a recommendation to buy or sell any securities.</p>
        <p>Revenue figures and growth rates are based on publicly available estimates. Actual figures may differ. Projections assume steady growth with decay, which is a simplification — actual outcomes will vary.</p>
        <p>Exit multiples at IPO depend on market conditions, company performance, and investor sentiment. Past performance of benchmark indices does not guarantee future results.</p>
      </div>
    ),
  },
];

export default function Methodology() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader title="Sources & Methodology" />
      <div className="space-y-2">
        {sections.map((section, i) => (
          <div key={i} className="glass overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4.5 text-left hover:bg-[#fafafa] transition-colors"
            >
              <span className="font-semibold text-[#1d1d1f] text-[15px]">{section.title}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-[#aeaeb2]" />
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
