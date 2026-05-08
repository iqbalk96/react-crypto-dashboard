const portfolioData = [45, 60, 52, 75, 68, 92, 88, 110, 95, 130];

export default function PortfolioPerformance() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0B1020]/80 p-6 backdrop-blur-xl mt-5">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Portfolio Performance
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Track your investment growth over time.
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['1D', '7D', '1M', '3M', '1Y'].map((item, index) => (
            <button
              key={item}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                index === 2
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-[#0F172A] to-[#111827] p-6">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-40 blur-3xl">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-violet-500/30" />
        </div>

        {/* Stats */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-400">Total Balance</p>

            <h3 className="mt-2 text-4xl font-bold tracking-tight text-white">
              $128,430.22
            </h3>

            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
                +12.45%
              </span>

              <span className="text-sm text-slate-400">
                vs last month
              </span>
            </div>
          </div>

          {/* Analytics Button */}
          <button className="rounded-xl bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-500">
            View Analytics
          </button>
        </div>

        {/* Fake Chart */}
        <div className="relative z-10 mt-10 flex h-72 items-end gap-3 overflow-hidden rounded-2xl">
          {portfolioData.map((height, index) => (
            <div
              key={index}
              className="group flex flex-1 flex-col justify-end"
            >
              <div
                className="rounded-t-2xl bg-gradient-to-t from-violet-600 via-fuchsia-500 to-cyan-400 transition-all duration-300 group-hover:opacity-80"
                style={{ height: `${height * 2}px` }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-6 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Updated 5 minutes ago
          </span>

          <div className="flex items-center gap-2 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Portfolio Tracking
          </div>
        </div>
      </div>
    </section>
  );
}