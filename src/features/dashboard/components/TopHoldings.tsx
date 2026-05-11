import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

// =====================================================
// TopHoldings.tsx
// =====================================================

type HoldingAsset = {
  name: string;
  symbol: string;
  amount: string;
  allocation: string;
  profit: string;
  positive: boolean;
  icon: string;
};

const holdings: HoldingAsset[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    amount: "$42,540.12",
    allocation: "45%",
    profit: "+8.25%",
    positive: true,
    icon: "🟠",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    amount: "$28,230.88",
    allocation: "28%",
    profit: "+5.14%",
    positive: true,
    icon: "⚪",
  },
  {
    name: "Solana",
    symbol: "SOL",
    amount: "$12,120.45",
    allocation: "14%",
    profit: "-2.45%",
    positive: false,
    icon: "🟣",
  },
  {
    name: "BNB",
    symbol: "BNB",
    amount: "$8,942.00",
    allocation: "13%",
    profit: "+1.92%",
    positive: true,
    icon: "🟡",
  },
];

export function TopHoldings() {
  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        {/* Header */}
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Top Holdings
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Top performing crypto allocations.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          className="rounded-xl border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
        >
          Manage
        </Button>
      </CardHeader>

      <CardContent>
        {/* Asset List */}
        <div className="space-y-4">
          {holdings.map((asset) => (
            <div
              key={asset.symbol}
              className="flex items-center justify-between rounded-2xl border border-transparent bg-muted/20 p-4 transition hover:border-primary/20 hover:bg-primary/[0.03]"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/50 text-2xl shadow-lg shadow-black/20">
                  {asset.icon}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {asset.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{asset.symbol}</span>
                    <span>•</span>
                    <span>
                      {asset.allocation} Allocation
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <h4 className="font-semibold">
                  {asset.amount}
                </h4>

                <p
                  className={`mt-1 text-sm font-medium ${
                    asset.positive
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {asset.profit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}