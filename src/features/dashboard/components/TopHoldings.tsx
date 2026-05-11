import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Button } from "@/shared/components/ui/button";
import { useMarketExposure } from "../derived/use-market-exposure";

// =====================================================
// COLORS (static UI mapping)
// =====================================================
const COLORS = ["#f7931a", "#627eea", "#94a3b8"];

// =====================================================
// Shimmer fallback (simple UX state)
// =====================================================
function ChartSkeleton() {
  return (
    <div className="h-[260px] w-full animate-pulse rounded-xl bg-muted/20" />
  );
}

// =====================================================
// Component
// =====================================================
export function MarketExposure() {
  const { data, isLoading } = useMarketExposure();

  // fallback safety
  const chartData =
    data?.items?.map((item) => ({
      name: item.name,
      value: item.value,
      color: item.color,
    })) ?? [];

  const total = chartData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  return (
    <Card className="mt-5 border-border/50 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Market Exposure
          </CardTitle>

          <CardDescription className="mt-1 text-sm">
            Market dominance and structure across major crypto assets.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          className="rounded-xl border-primary/20 bg-primary/10 text-primary"
        >
          Refresh
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Donut Chart */}
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index] ?? "#94a3b8"}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Stats */}
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 animate-pulse rounded-xl bg-muted/20"
                  />
                ))
              : chartData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border bg-muted/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index] ?? "#94a3b8",
                        }}
                      />
                      <span className="font-medium">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      {item.value.toFixed(2)}%
                    </span>
                  </div>
                ))}

            {/* Total */}
            {!isLoading && (
              <div className="pt-4 border-t text-sm text-muted-foreground">
                Total Market Representation:{" "}
                <span className="font-semibold text-foreground">
                  {total.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}