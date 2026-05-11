import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

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
    action: "Bought Bitcoin",
    asset: "BTC",
    amount: "$4,500.00",
    time: "5 min ago",
    status: "Completed",
    positive: true,
  },
  {
    action: "Sold Ethereum",
    asset: "ETH",
    amount: "$2,120.50",
    time: "18 min ago",
    status: "Completed",
    positive: false,
  },
  {
    action: "Staked Solana",
    asset: "SOL",
    amount: "$1,450.00",
    time: "1 hour ago",
    status: "Active",
    positive: true,
  },
  {
    action: "Swapped BNB",
    asset: "BNB",
    amount: "$820.30",
    time: "3 hours ago",
    status: "Pending",
    positive: true,
  },
];

export function RecentActivity() {
  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        {/* Header */}
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Recent Activity
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Latest market and trading activities.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          className="rounded-xl border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
        >
          View All
        </Button>
      </CardHeader>

      <CardContent>
        {/* Activity List */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-transparent bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.03]"
            >
              {/* Left */}
              <div>
                <h3 className="font-medium">
                  {activity.action}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{activity.asset}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <h4 className="font-semibold">
                  {activity.amount}
                </h4>

                <p
                  className={`mt-1 text-sm font-medium ${activity.positive
                      ? "text-emerald-400"
                      : "text-red-400"
                    }`}
                >
                  {activity.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}