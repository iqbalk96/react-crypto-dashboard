// =====================================================
// RecentActivity.tsx
// =====================================================

type ActivityItem = {
  action: string;
  asset: string;
  amount: string;
  time: string;
  status: string;
  positive: boolean;
};

const activities: ActivityItem[] = [
  {
    action: 'Bought Bitcoin',
    asset: 'BTC',
    amount: '$4,500.00',
    time: '5 min ago',
    status: 'Completed',
    positive: true,
  },
  {
    action: 'Sold Ethereum',
    asset: 'ETH',
    amount: '$2,120.50',
    time: '18 min ago',
    status: 'Completed',
    positive: false,
  },
  {
    action: 'Staked Solana',
    asset: 'SOL',
    amount: '$1,450.00',
    time: '1 hour ago',
    status: 'Active',
    positive: true,
  },
  {
    action: 'Swapped BNB',
    asset: 'BNB',
    amount: '$820.30',
    time: '3 hours ago',
    status: 'Pending',
    positive: true,
  },
];

export function RecentActivity() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0B1020]/80 p-6 backdrop-blur-xl mt-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest transactions and portfolio updates.
          </p>
        </div>

        <button className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20 hover:text-white">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-transparent bg-white/[0.03] p-4 transition hover:border-violet-500/20 hover:bg-violet-500/[0.03]"
          >
            {/* Left */}
            <div>
              <h3 className="font-medium text-white">
                {activity.action}
              </h3>

              <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                <span>{activity.asset}</span>
                <span>•</span>
                <span>{activity.time}</span>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <h4 className="font-semibold text-white">
                {activity.amount}
              </h4>

              <p
                className={`mt-1 text-sm font-medium ${
                  activity.positive
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {activity.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
