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

import type { DCASimulationResult } from "../types/domain.types";
import { formatPercent, formatUnits, formatUsd } from "../utils/format";

interface Props {
  result: DCASimulationResult;
  symbol: string;
}

export function DCAAnalytics({ result, symbol }: Props) {
  const { summary, timeline, latestPrice } = result;

  // Return (%) terhadap total investasi pada tiap titik setelah pembelian pertama
  const returns = timeline
    .filter((p) => p.totalInvested > 0)
    .map(
      (p) => ((p.portfolioValue - p.totalInvested) / p.totalInvested) * 100,
    );

  const bestReturn = returns.length ? Math.max(...returns) : 0;
  const worstReturn = returns.length ? Math.min(...returns) : 0;

  const analyticsData = [
    {
      label: "Average Buy Price",
      value: formatUsd(summary.averageBuyPrice),
      icon: BadgeDollarSign,
      positive: true,
    },
    {
      label: `Current ${symbol} Price`,
      value: formatUsd(latestPrice),
      icon: Coins,
      positive: true,
    },
    {
      label: `Total ${symbol} Accumulated`,
      value: `${formatUnits(summary.totalUnitsAccumulated)} ${symbol}`,
      icon: Activity,
      positive: true,
    },
    {
      label: "Total Purchases",
      value: String(summary.totalPurchases),
      icon: CalendarClock,
      positive: true,
    },
    {
      label: "Best Return",
      value: formatPercent(bestReturn),
      icon: TrendingUp,
      positive: bestReturn >= 0,
    },
    {
      label: "Worst Return",
      value: formatPercent(worstReturn),
      icon: TrendingDown,
      positive: worstReturn >= 0,
    },
  ];

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
