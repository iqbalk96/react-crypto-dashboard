"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const chartData = [
  {
    date: "Jan",
    invested: 1000,
    portfolioValue: 1200,
  },
  {
    date: "Feb",
    invested: 2000,
    portfolioValue: 2500,
  },
  {
    date: "Mar",
    invested: 3000,
    portfolioValue: 4200,
  },
  {
    date: "Apr",
    invested: 4000,
    portfolioValue: 5100,
  },
  {
    date: "May",
    invested: 5000,
    portfolioValue: 6900,
  },
  {
    date: "Jun",
    invested: 6000,
    portfolioValue: 8420,
  },
  {
    date: "Jul",
    invested: 7000,
    portfolioValue: 9800,
  },
];

export function DCAPortfolioGrowthChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle>
          Portfolio Growth
        </CardTitle>

        <CardDescription>
          Compare your cumulative investment
          against portfolio performance over time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[380px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-border/40"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) =>
                  `$${value / 1000}k`
                }
                className="text-xs"
              />

              <Tooltip
                cursor={{
                  stroke: "hsl(var(--primary))",
                  strokeOpacity: 0.2,
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border:
                    "1px solid hsl(var(--border))",
                  background:
                    "hsl(var(--background))",
                }}
              />

              <Legend />

              {/* Total Invested */}
              <Line
                type="monotone"
                dataKey="invested"
                stroke="#71717a"
                strokeWidth={2}
                dot={false}
                name="Total Invested"
              />

              {/* Portfolio Value */}
              <Line
                type="monotone"
                dataKey="portfolioValue"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
                name="Portfolio Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}