import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Landmark,
  TrendingUp,
  PiggyBank,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

import { DCASummary }
  from "../../types/dca-summary.types";

interface Props {
  summary: DCASummary;
}

const summaryData = (
  summary: DCASummary
) => [
  {
    title: "Total Invested",
    value: `$${summary.totalInvested.toFixed(2)}`,
    change: `+${summary.totalPurchases} DCA Purchases`,
    positive: true,
    icon: PiggyBank,
  },
  {
    title: "Portfolio Value",
    value: `$${summary.currentValue.toFixed(2)}`,
    change: `${summary.totalReturnPercentage.toFixed(2)}%`,
    positive:
      summary.totalReturn >= 0,
    icon: Wallet,
  },
  {
    title: "Profit / Loss",
    value: `$${summary.totalReturn.toFixed(2)}`,
    change: `${summary.totalUnitsAccumulated.toFixed(4)} BTC`,
    positive:
      summary.totalReturn >= 0,
    icon: TrendingUp,
  },
  {
    title: "Average Buy Price",
    value: `$${summary.averageBuyPrice.toFixed(2)}`,
    change: `${summary.averageBuyVsCurrent.toFixed(2)}% vs Current`,
    positive:
      summary.averageBuyVsCurrent <= 0,
    icon: Landmark,
  },
];

export function DcaSummaryCards({
  summary,
}: Props) {
  return (
    <div className="grid gap-4 mt-5 sm:grid-cols-2 xl:grid-cols-4">
      {summaryData(summary).map(
        (item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay:
                  index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
            >
              <Card
                className="
                  border-border/50
                  bg-card/50
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-primary/30
                  hover:shadow-lg
                  hover:shadow-primary/5
                "
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Left Content */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight">
                          {item.value}
                        </h2>
                      </div>

                      <div
                        className={`flex items-center gap-1 text-sm ${
                          item.positive
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.positive ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}

                        <span>
                          {item.change}
                        </span>
                      </div>
                    </div>

                    {/* Right Icon */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/10 bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        }
      )}
    </div>
  );
}