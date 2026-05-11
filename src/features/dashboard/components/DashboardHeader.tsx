import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";

import {
  TrendingUp,
  TrendingDown,
  Activity,
  Coins,
} from "lucide-react";

import { useMarketInsight } from "../derived/use-market-insight";

// =====================================================
// Loading Skeleton
// =====================================================
function HeaderSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-2xl bg-muted/20"
        />
      ))}
    </div>
  );
}

// =====================================================
// Component
// =====================================================
export default function DashboardHeader({
  title = "Crypto Market Overview",
  subtitle = "Live market intelligence powered by global crypto data.",
}) {
  const {
    trend,
    btcDominance,
    volatility,
    totalMarketCap,
    activeCoins,
    isLoading,
  } = useMarketInsight();

  
  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="space-y-6">

        {/* Title */}
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {title}
          </CardTitle>

          <CardDescription className="max-w-2xl text-sm">
            {subtitle}
          </CardDescription>
        </div>

        {/* Loading */}
        {isLoading ? (
          <HeaderSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Market Trend */}
            <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Market Trend
                </p>
                <p className="font-semibold capitalize">
                  {trend}
                </p>
              </div>

              {trend === "bullish" ? (
                <TrendingUp className="text-emerald-400" />
              ) : trend === "bearish" ? (
                <TrendingDown className="text-red-400" />
              ) : (
                <Activity className="text-muted-foreground" />
              )}
            </div>

            {/* BTC Dominance */}
            <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  BTC Dominance
                </p>
                <p className="font-semibold">
                  {btcDominance}%
                </p>
              </div>

              <Coins className="text-orange-400" />
            </div>

            {/* Volatility */}
            <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Volatility
                </p>
                <p className="font-semibold capitalize">
                  {volatility}
                </p>
              </div>

              <Activity
                className={
                  volatility === "high"
                    ? "text-red-400"
                    : volatility === "low"
                    ? "text-emerald-400"
                    : "text-blue-400"
                }
              />
            </div>

          </div>
        )}

        {/* Secondary stats */}
        {!isLoading && (
          <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted-foreground">

            <span>
              Active Coins:{" "}
              <b className="text-foreground">
                {activeCoins?.toLocaleString()}
              </b>
            </span>

            <span>
              Market Cap:{" "}
              <b className="text-foreground">
                ${(totalMarketCap / 1e12).toFixed(2)} T
              </b>
            </span>

          </div>
        )}
      </CardHeader>

      <CardContent />
    </Card>
  );
}