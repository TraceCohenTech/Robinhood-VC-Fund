export default function Footer() {
  return (
    <footer className="space-y-6 pb-10">
      {/* Disclaimer banner */}
      <div className="glass p-6">
        <h3 className="text-sm font-bold text-[#1d1d1f] mb-2">Important Disclaimer</h3>
        <div className="space-y-2 text-[13px] text-[#6e6e73] leading-relaxed">
          <p>
            <strong className="text-[#1d1d1f]">This is not financial advice.</strong> This dashboard is an independent educational resource created for informational purposes only. It does not constitute a recommendation to buy, sell, or hold any securities, including $RVI or shares of any portfolio company.
          </p>
          <p>
            <strong className="text-[#1d1d1f]">No affiliation.</strong> The author has no affiliation, endorsement, sponsorship, or business relationship with Robinhood Markets, Inc., Robinhood Ventures Fund I, or any of the portfolio companies mentioned (Databricks, Revolut, Mercor, Ramp, Oura, Airwallex, or Boom Supersonic). This is entirely independent analysis.
          </p>
          <p>
            <strong className="text-[#1d1d1f]">Data accuracy.</strong> All data points, valuations, and figures are sourced from public filings (SEC EDGAR), press releases, and third-party research. Revenue figures are estimates based on publicly reported ARR and may not reflect actual figures. Market benchmarks are historical and do not guarantee future results. Always do your own research and consult a financial advisor before making investment decisions.
          </p>
        </div>
      </div>

      {/* Fund link */}
      <div className="text-center">
        <a
          href="https://robinhood.com/stocks/RVI"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#00C805] hover:underline font-medium"
        >
          View $RVI on Robinhood →
        </a>
      </div>

      {/* Credits */}
      <div className="text-center space-y-3">
        <p className="text-[12px] text-[#aeaeb2]">
          Independent analysis &middot; Not affiliated with Robinhood &middot; For educational purposes only
        </p>
        <div className="flex items-center justify-center gap-5 text-sm">
          <a
            href="https://x.com/Trace_Cohen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            Twitter
          </a>
          <span className="w-1 h-1 rounded-full bg-[#d1d1d6]" />
          <a
            href="mailto:t@nyvp.com"
            className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            t@nyvp.com
          </a>
        </div>
      </div>
    </footer>
  );
}
