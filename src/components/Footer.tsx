export default function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-slate-400 space-y-2">
      <p>
        Built with React, TypeScript, and Recharts — 50,000-iteration Monte Carlo simulation running in-browser.
      </p>
      <p className="flex items-center justify-center gap-4">
        <a
          href="https://x.com/Trace_Cohen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-indigo-600 transition-colors"
        >
          Twitter
        </a>
        <span className="text-slate-300">|</span>
        <a
          href="mailto:t@nyvp.com"
          className="text-slate-500 hover:text-indigo-600 transition-colors"
        >
          t@nyvp.com
        </a>
      </p>
    </footer>
  );
}
