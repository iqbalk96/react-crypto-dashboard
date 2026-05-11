import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

const portfolioData = [
  45, 60, 52, 75, 68, 92, 88, 110, 95, 130,
];

export default function PortfolioPerformance() {
  return (
    <Card className="min-w-0 mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Header */}
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Portfolio Performance
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Track your investment growth over time.
          </CardDescription>
        </div>

        {/* Time Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {["1D", "7D", "1M", "3M", "1Y"].map((item, index) => (
            <Button
              key={item}
              variant={index === 2 ? "default" : "secondary"}
              className={`rounded-xl ${
                index !== 2
                  ? "bg-muted/40 text-muted-foreground hover:text-foreground"
                  : ""
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Chart Area */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-muted/40 p-6">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-40 blur-3xl">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/30" />
          </div>

          {/* Stats */}
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Balance
              </p>

              <h3 className="mt-2 text-4xl font-bold tracking-tight">
                $128,430.22
              </h3>

              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
                  +12.45%
                </span>

                <span className="text-sm text-muted-foreground">
                  vs last month
                </span>
              </div>
            </div>
          </div>

          {/* Fake Chart */}
          <div className="relative z-10 mt-10 flex h-72 items-end gap-3 overflow-hidden rounded-2xl">
            {portfolioData.map((height, index) => (
              <div
                key={index}
                className="group flex flex-1 flex-col justify-end"
              >
                <div
                  className="rounded-t-2xl bg-gradient-to-t from-primary via-fuchsia-500 to-cyan-400 transition-all duration-300 group-hover:opacity-80"
                  style={{ height: `${height * 2}px` }}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-6 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Updated 5 minutes ago
            </span>

            <div className="flex items-center gap-2 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live Portfolio Tracking
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}