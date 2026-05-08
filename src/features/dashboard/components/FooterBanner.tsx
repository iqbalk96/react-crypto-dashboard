export default function FooterBanner() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0B1020]/80 p-6 backdrop-blur-xl mt-5">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            🚀 AI Market Insight
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white">
            Crypto market sentiment is turning bullish this week.
          </h2>

          <p className="mt-4 leading-relaxed text-slate-400">
            Bitcoin and Ethereum continue showing strong momentum with
            increasing institutional inflows and positive on-chain activity.
            Monitor your portfolio closely and stay ahead of market trends.
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'BTC Bullish',
              'ETH Momentum',
              'AI Analytics',
              'Portfolio Growth',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col gap-4">
          <button className="rounded-2xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-500">
            View Full Analytics
          </button>

          <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
            Explore Market Trends
          </button>
        </div>
      </div>
    </section>
  );
}