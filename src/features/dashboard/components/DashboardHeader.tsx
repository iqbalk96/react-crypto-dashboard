import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";

import { TrendingUp, TrendingDown, Activity } from "lucide-react";

// =====================================================
// Mock insight (nanti bisa dari /global CoinGecko)
// =====================================================
const marketTrend = "bullish"; // bullish | bearish
const btcDominance = 52.4;
const volatility = "moderate";

export default function DashboardHeader({
  title = "Crypto Market Overview",
  subtitle = "Live market intelligence powered by global crypto data.",
}) {
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

        {/* Market Insight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trend */}
          <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Market Trend
              </p>

              <p className="font-semibold capitalize">
                {marketTrend}
              </p>
            </div>

            {marketTrend === "bullish" ? (
              <TrendingUp className="text-emerald-400" />
            ) : (
              <TrendingDown className="text-red-400" />
            )}
          </div>

          {/* BTC Dominance */}
          <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4">
            <div>
              <p className="text-sm text-muted-foreground">
                BTC Dominance
              </p>

              <p className="font-semibold">{btcDominance}%</p>
            </div>

            <span className="text-orange-400 font-bold">₿</span>
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

            <Activity className="text-blue-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent />
    </Card>
  );
}