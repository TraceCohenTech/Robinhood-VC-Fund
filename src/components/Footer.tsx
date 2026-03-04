export default function Footer() {
  return (
    <footer className="text-center py-10 space-y-3">
      <p className="text-[13px] text-[#aeaeb2]">
        For educational purposes only. Not financial advice.
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
    </footer>
  );
}
