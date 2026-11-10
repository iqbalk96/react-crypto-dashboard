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

import type { DCATimelinePoint } from "../types/domain.types";
import { formatCompactUsd, formatUsd } from "../utils/format";

interface Props {
  timeline: DCATimelinePoint[];
}

export function DCAPortfolioGrowthChart({ timeline }: Props) {
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
            <LineChart data={timeline}>
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
                minTickGap={40}
                className="text-xs"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={formatCompactUsd}
                className="text-xs"
              />

              <Tooltip
                formatter={(value) => formatUsd(Number(value))}
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
                dataKey="totalInvested"
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
