export default function Footer() {
  return (
    <footer className="space-y-6 pb-10">
      {/* Disclaimer banner */}
      <div className="glass p-6">
        <h3 className="text-sm font-bold text-[#1d1d1f] mb-2">Important Disclaimer</h3>
        <div className="space-y-2 text-[13px] text-[#6e6e73] leading-relaxed">
          <p>
            <strong className="text-[#1d1d1f]">This is not financial advice.</strong> This dashboard is an independent educational resource created for informational purposes only. It does not constitute a recommendation to buy, sell, or hold any securities.
          </p>
          <p>
            <strong className="text-[#1d1d1f]">No affiliation.</strong> The author has no affiliation, endorsement, or business relationship with Robinhood Markets, Inc., RVI, or any of the portfolio companies mentioned. This analysis is based entirely on publicly available information.
          </p>
          <p>
            All data points, valuations, and figures are sourced from public filings, press reports, and third-party research. Actual figures may differ. Revenue multiples, growth rates, and market benchmarks are approximations and should not be relied upon for investment decisions.
          </p>
        </div>
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
