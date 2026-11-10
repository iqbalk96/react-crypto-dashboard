"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import type { DCATimelinePoint } from "../types/domain.types";
import { formatCompactUsd, formatUsd } from "../utils/format";

interface Props {
  timeline: DCATimelinePoint[];
  symbol: string;
  name: string;
}

export function DCAPriceChart({ timeline, symbol, name }: Props) {
  // buyPrice hanya terisi pada titik pembelian, selain itu null (tidak digambar)
  const chartData = timeline.map((point) => ({
    date: point.date,
    price: point.price,
    buyPrice: point.bought ? point.price : null,
  }));

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle>
          {symbol} Price with DCA Purchases
        </CardTitle>

        <CardDescription>
          Visualize {name} price movement
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
                minTickGap={40}
                tick={{
                  fill: "#71717a",
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={["auto", "auto"]}
                tickFormatter={formatCompactUsd}
                tick={{
                  fill: "#71717a",
                  fontSize: 12,
                }}
              />

              <Tooltip
                formatter={(value, key) => [
                  formatUsd(Number(value)),
                  key === "buyPrice" ? "DCA Purchase" : `${symbol} Price`,
                ]}
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

              {/* Price Line */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#eab308"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                }}
                name={`${symbol} Price`}
              />

              {/* DCA Buy Points */}
              <Line
                dataKey="buyPrice"
                stroke="none"
                dot={{
                  r: 4,
                  fill: "#22c55e",
                  stroke: "#09090b",
                  strokeWidth: 2,
                }}
                activeDot={false}
                isAnimationActive={false}
                name="DCA Purchase"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

            <span className="text-sm text-muted-foreground">
              {symbol} Price
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
