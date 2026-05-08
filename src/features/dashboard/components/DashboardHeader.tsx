type DashboardHeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function DashboardHeader({
  title = 'Dashboard',
  subtitle = "Welcome back! Here's what's happening with your portfolio today.",
}: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-6 rounded-lg border border-white/10 bg-[#0B1020]/80 p-6 backdrop-blur-xl mt-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter */}
          <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white">
            <span>📅</span>
            <span>May 8, 2026</span>
          </button>

          {/* Currency */}
          <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white">
            USD
          </button>

          {/* Time Range */}
          <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 p-1">
            {['1D', '7D', '30D', '90D', '1Y'].map((range, index) => (
              <button
                key={range}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  index === 0
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
