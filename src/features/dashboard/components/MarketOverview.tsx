type MarketAsset = {
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  positive: boolean;
  icon: string;
};

const marketData: MarketAsset[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$68,432.12',
    change: '+3.25%',
    marketCap: '$1.35T',
    positive: true,
    icon: '🟠',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$3,542.65',
    change: '+4.35%',
    marketCap: '$425.68B',
    positive: true,
    icon: '⚪',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: '$164.21',
    change: '-1.25%',
    marketCap: '$76.58B',
    positive: false,
    icon: '🟣',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: '$598.72',
    change: '+2.15%',
    marketCap: '$88.12B',
    positive: true,
    icon: '🟡',
  },
];

export default function MarketOverview() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0B1020]/80 p-6 backdrop-blur-xl mt-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Market Overview
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Top crypto assets market performance.
          </p>
        </div>

        <button className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20 hover:text-white">
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden grid-cols-5 border-b border-white/10 pb-4 text-sm text-slate-500 md:grid">
        <span>Asset</span>
        <span>Price</span>
        <span>24h %</span>
        <span>Market Cap</span>
        <span className="text-right">Chart</span>
      </div>

      {/* Market Items */}
      <div className="mt-2 space-y-3">
        {marketData.map((asset) => (
          <div
            key={asset.symbol}
            className="grid grid-cols-1 gap-4 rounded-2xl border border-transparent bg-white/[0.02] p-4 transition hover:border-violet-500/20 hover:bg-violet-500/[0.03] md:grid-cols-5 md:items-center"
          >
            {/* Asset */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl shadow-lg shadow-black/20">
                {asset.icon}
              </div>

              <div>
                <h3 className="font-medium text-white">{asset.name}</h3>
                <p className="text-sm text-slate-400">{asset.symbol}</p>
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-sm text-slate-400 md:hidden">Price</p>
              <span className="font-medium text-white">{asset.price}</span>
            </div>

            {/* Change */}
            <div>
              <p className="text-sm text-slate-400 md:hidden">24h</p>
              <span
                className={`font-medium ${
                  asset.positive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {asset.change}
              </span>
            </div>

            {/* Market Cap */}
            <div>
              <p className="text-sm text-slate-400 md:hidden">Market Cap</p>
              <span className="font-medium text-white">
                {asset.marketCap}
              </span>
            </div>

            {/* Fake Chart */}
            <div className="flex items-center justify-start md:justify-end">
              <div className="flex items-end gap-1">
                {[18, 24, 16, 30, 22, 34, 26, 40].map((height, index) => (
                  <div
                    key={index}
                    className={`w-1 rounded-full bg-gradient-to-t ${
                      asset.positive
                        ? 'from-emerald-500 to-cyan-400'
                        : 'from-red-500 to-pink-400'
                    }`}
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
