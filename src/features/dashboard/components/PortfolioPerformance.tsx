import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useState } from "react";
import { useMarketPerformance } from "../hooks/use-market-performance";
import { CoinId, MarketRange } from "../types/market-performance.types";

const TIME_RANGES: MarketRange[] = ["1D", "7D", "1M", "3M", "1Y"];

const COINS = [
  { label: "BTC", value: "bitcoin" },
  { label: "ETH", value: "ethereum" },
  { label: "BNB", value: "binancecoin" },
] as const;

export default function MarketPerformance() {
  const [range, setRange] = useState<MarketRange>("7D");
  const [coin, setCoin] = useState<CoinId>("bitcoin");

  const { data, isLoading, isError } = useMarketPerformance(range, coin);

  return (
    <Card className="min-w-0 mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT: TITLE */}
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Market Performance
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Crypto market trend overview based on CoinGecko data.
          </CardDescription>
        </div>

        {/* RIGHT: CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* COIN SELECTOR */}
          <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-1">
            {COINS.map((c) => (
              <Button
                key={c.value}
                onClick={() => setCoin(c.value)}
                className={`rounded-lg px-3 py-1 text-sm transition ${coin === c.value
                    ? "rounded-xl"
                    : "rounded-xl bg-muted/40 text-muted-foreground hover:text-foreground"
                  }`}
              >
                {c.label}
              </Button>
            ))}
          </div>

          {/* TIME RANGE */}
          {TIME_RANGES.map((item) => (
            <Button
              key={item}
              variant={range === item ? "default" : "secondary"}
              onClick={() => setRange(item)}
              className={
                range !== item
                  ? "rounded-xl bg-muted/40 text-muted-foreground hover:text-foreground"
                  : "rounded-xl"
              }
            >
              {item}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-muted/40 p-6">
          {/* glow */}
          <div className="absolute inset-0 opacity-40 blur-3xl">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/30" />
          </div>

          {/* stats */}
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {COINS.find((c) => c.value === coin)?.label} Price Index
              </p>

              <h3 className="mt-2 text-4xl font-bold tracking-tight">
                {isLoading ? "Loading..." : `$${data?.currentValue.toLocaleString()}`}
              </h3>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${(data?.changePercent ?? 0) >= 0
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                    }`}
                >
                  {data?.changePercent && data.changePercent > 0 ? "+" : ""}
                  {data?.changePercent?.toFixed(2) ?? 0}%
                </span>

                <span className="text-sm text-muted-foreground">
                  {range} performance
                </span>
              </div>
            </div>
          </div>

          {/* chart */}
          <div className="relative z-10 mt-10 h-72">
            {isLoading && (
              <div className="h-full w-full animate-pulse rounded-2xl bg-muted/20" />
            )}

            {isError && (
              <div className="flex h-full items-center justify-center text-sm text-red-400">
                Failed to load data
              </div>
            )}

            {!isLoading && !isError && data && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* footer */}
          <div className="relative z-10 mt-6 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Data from CoinGecko
            </span>

            <div className="flex items-center gap-2 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live Market Tracking
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}