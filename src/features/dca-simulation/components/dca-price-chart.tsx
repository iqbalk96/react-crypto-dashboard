"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
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
    btcPrice: 42000,
    dcaBuy: 42000,
  },
  {
    date: "Feb",
    btcPrice: 39000,
    dcaBuy: null,
  },
  {
    date: "Mar",
    btcPrice: 45000,
    dcaBuy: 45000,
  },
  {
    date: "Apr",
    btcPrice: 51000,
    dcaBuy: null,
  },
  {
    date: "May",
    btcPrice: 62000,
    dcaBuy: 62000,
  },
  {
    date: "Jun",
    btcPrice: 70000,
    dcaBuy: null,
  },
  {
    date: "Jul",
    btcPrice: 65500,
    dcaBuy: 65500,
  },
];

export function DCAPriceChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle>
          BTC Price with DCA Purchases
        </CardTitle>

        <CardDescription>
          Visualize Bitcoin price movement
          alongside your DCA entry points.
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
                stroke="#27272a"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{
                  fill: "#71717a",
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) =>
                  `$${value / 1000}k`
                }
                tick={{
                  fill: "#71717a",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "#8b5cf6",
                  strokeOpacity: 0.2,
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border:
                    "1px solid #27272a",
                  background: "#09090b",
                }}
                labelStyle={{
                  color: "#fafafa",
                }}
              />

              {/* BTC Price Line */}
              <Line
                type="monotone"
                dataKey="btcPrice"
                stroke="#eab308"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
                name="BTC Price"
              />

              {/* DCA Buy Points */}
              {chartData.map((item, index) =>
                item.dcaBuy ? (
                  <ReferenceDot
                    key={index}
                    x={item.date}
                    y={item.dcaBuy}
                    r={5}
                    fill="#22c55e"
                    stroke="#09090b"
                    strokeWidth={2}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

            <span className="text-sm text-muted-foreground">
              BTC Price
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <span className="text-sm text-muted-foreground">
              DCA Purchase
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}