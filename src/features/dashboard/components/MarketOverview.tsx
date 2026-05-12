import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

import { Badge } from "@/shared/components/ui/badge";

import { useMarketOverview } from "../hooks/use-market-overview";

import {
  formatCurrency,
  formatMarketCap,
} from "@/shared/utils";

export default function MarketOverview() {
  const { data, isLoading } =
    useMarketOverview();

  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Market Overview
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Top crypto assets market
            performance.
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
        {isLoading && (
          <div className="py-10 text-center text-muted-foreground">
            Loading market data...
          </div>
        )}

        {!isLoading && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead>
                    Asset
                  </TableHead>

                  <TableHead>
                    Price
                  </TableHead>

                  <TableHead>
                    24h %
                  </TableHead>

                  <TableHead>
                    Market Cap
                  </TableHead>

                  <TableHead className="text-right">
                    Trend
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.map((asset) => {
                  const positive =
                    asset.price_change_percentage_24h >=
                    0;

                  return (
                    <TableRow
                      key={asset.id}
                      className="border-border/50"
                    >
                      {/* Asset */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 rounded-xl border border-border/50">
                            <AvatarImage
                              src={asset.image}
                              alt={asset.name}
                            />

                            <AvatarFallback>
                              {asset.symbol
                                .slice(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">
                              {asset.name}
                            </p>

                            <p className="text-xs uppercase text-muted-foreground">
                              {asset.symbol}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="font-medium">
                        {formatCurrency(
                          asset.current_price
                        )}
                      </TableCell>

                      {/* Change */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            positive
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : "border-red-500/20 bg-red-500/10 text-red-400"
                          }
                        >
                          {positive ? "+" : ""}
                          {asset.price_change_percentage_24h.toFixed(
                            2
                          )}
                          %
                        </Badge>
                      </TableCell>

                      {/* Market Cap */}
                      <TableCell className="font-medium">
                        {formatMarketCap(
                          asset.market_cap
                        )}
                      </TableCell>

                      {/* Trend */}
                      <TableCell>
                        <div className="flex items-center justify-end">
                          <div className="flex items-end gap-1">
                            {[
                              18, 24, 16, 30, 22, 34,
                              26, 40,
                            ].map(
                              (height, index) => (
                                <div
                                  key={index}
                                  className={`w-1 rounded-full bg-gradient-to-t ${
                                    positive
                                      ? "from-emerald-500 to-cyan-400"
                                      : "from-red-500 to-pink-400"
                                  }`}
                                  style={{
                                    height,
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}