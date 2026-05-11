import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

import { useMarketOverview } from "../hooks/use-market-overview";

import {
  formatCurrency,
  formatMarketCap,
} from "@/shared/utils";

export default function MarketOverview() {
  const { data, isLoading } = useMarketOverview();

  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Market Overview
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Top crypto assets market performance.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          className="rounded-2xl border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
        >
          View All
        </Button>
      </CardHeader>

      <CardContent>
        <div className="hidden grid-cols-5 border-b border-border/50 pb-4 text-sm text-muted-foreground md:grid">
          <span>Asset</span>
          <span>Price</span>
          <span>24h %</span>
          <span>Market Cap</span>
          <span className="text-right">Chart</span>
        </div>

        <div className="mt-2 space-y-3">
          {isLoading && (
            <div className="py-10 text-center text-muted-foreground">
              Loading market data...
            </div>
          )}

          {data?.map((asset) => {
            const positive =
              asset.price_change_percentage_24h >= 0;

            return (
              <div
                key={asset.id}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-transparent bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.03] md:grid-cols-5 md:items-center"
              >
                {/* Asset */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/50 p-2 shadow-lg shadow-black/20">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="h-8 w-8"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">
                      {asset.name}
                    </h3>

                    <p className="text-sm uppercase text-muted-foreground">
                      {asset.symbol}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-sm text-muted-foreground md:hidden">
                    Price
                  </p>

                  <span className="font-medium">
                    {formatCurrency(asset.current_price)}
                  </span>
                </div>

                {/* Change */}
                <div>
                  <p className="text-sm text-muted-foreground md:hidden">
                    24h
                  </p>

                  <span
                    className={`font-medium ${positive
                        ? "text-emerald-400"
                        : "text-red-400"
                      }`}
                  >
                    {positive ? "+" : ""}
                    {asset.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>

                {/* Market Cap */}
                <div>
                  <p className="text-sm text-muted-foreground md:hidden">
                    Market Cap
                  </p>

                  <span className="font-medium">
                    {formatMarketCap(asset.market_cap)}
                  </span>
                </div>

                {/* Fake Chart */}
                <div className="flex items-center justify-start md:justify-end">
                  <div className="flex items-end gap-1">
                    {[18, 24, 16, 30, 22, 34, 26, 40].map(
                      (height, index) => (
                        <div
                          key={index}
                          className={`w-1 rounded-full bg-gradient-to-t ${positive
                              ? "from-emerald-500 to-cyan-400"
                              : "from-red-500 to-pink-400"
                            }`}
                          style={{ height }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}