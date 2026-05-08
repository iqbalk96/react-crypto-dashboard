// =====================================================
// TopHoldings.tsx
// =====================================================

type HoldingAsset = {
  name: string;
  symbol: string;
  amount: string;
  allocation: string;
  profit: string;
  positive: boolean;
  icon: string;
};

const holdings: HoldingAsset[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '$42,540.12',
    allocation: '45%',
    profit: '+8.25%',
    positive: true,
    icon: '🟠',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '$28,230.88',
    allocation: '28%',
    profit: '+5.14%',
    positive: true,
    icon: '⚪',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    amount: '$12,120.45',
    allocation: '14%',
    profit: '-2.45%',
    positive: false,
    icon: '🟣',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    amount: '$8,942.00',
    allocation: '13%',
    profit: '+1.92%',
    positive: true,
    icon: '🟡',
  },
];

export function TopHoldings() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0B1020]/80 p-6 backdrop-blur-xl mt-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Top Holdings
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your strongest crypto positions.
          </p>
        </div>

        <button className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20 hover:text-white">
          Manage
        </button>
      </div>

      {/* Asset List */}
      <div className="space-y-4">
        {holdings.map((asset) => (
          <div
            key={asset.symbol}
            className="flex items-center justify-between rounded-2xl border border-transparent bg-white/[0.03] p-4 transition hover:border-violet-500/20 hover:bg-violet-500/[0.03]"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl shadow-lg shadow-black/20">
                {asset.icon}
              </div>

              <div>
                <h3 className="font-semibold text-white">{asset.name}</h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <span>{asset.symbol}</span>
                  <span>•</span>
                  <span>{asset.allocation} Allocation</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <h4 className="font-semibold text-white">{asset.amount}</h4>

              <p
                className={`mt-1 text-sm font-medium ${
                  asset.positive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {asset.profit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}