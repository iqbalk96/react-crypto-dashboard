import {
  Activity,
  BadgeDollarSign,
  CalendarClock,
  Coins,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const analyticsData = [
  {
    label: "Average Buy Price",
    value: "$42,376",
    icon: BadgeDollarSign,
    positive: true,
  },
  {
    label: "Current BTC Price",
    value: "$65,049",
    icon: Coins,
    positive: true,
  },
  {
    label: "Total BTC Accumulated",
    value: "0.283152 BTC",
    icon: Activity,
    positive: true,
  },
  {
    label: "Total Purchases",
    value: "120",
    icon: CalendarClock,
    positive: true,
  },
  {
    label: "Best 1Y Return",
    value: "+127.35%",
    icon: TrendingUp,
    positive: true,
  },
  {
    label: "Worst Drawdown",
    value: "-32.45%",
    icon: TrendingDown,
    positive: false,
  },
];

export function DCAAnalytics() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle>
          DCA Analytics
        </CardTitle>

        <CardDescription>
          Key insights from your historical
          DCA investment performance.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {analyticsData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 px-4 py-3 transition-colors hover:border-primary/20"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    item.positive
                      ? "bg-primary/10 text-primary"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p
                  className={`text-sm font-semibold md:text-base ${
                    item.positive
                      ? "text-foreground"
                      : "text-red-500"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}