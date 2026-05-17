import { motion } from "framer-motion";
import { DCAHeader } from "../components/dca-header";
import { DCAPortfolioGrowthChart } from "../components/dca-portfolio-growth";
import { DCAPriceChart } from "../components/dca-price-chart";
import { DCAAnalytics } from "../components/dca-analytics";
import { DCAHistoryTable } from "../components/dca-history";
import { DCAControls } from "../components/dca-controls";
import { DcaSummaryCards } from "../components/dca-summary-cards";

import { useState } from "react";
import { DCAConfig } from "../types/domain.types";
// import { DCASummary } from "../types/dca-summary.types";

// custom hooks
import { useHistoricalData } from "../hooks/use-historical-data";
import { calculateDaysBetween } from "../utils/calculate-days";
import { runDCASimulation } from "../services/dca-simulation.service";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DcaSimulationPage() {

  const [config, setConfig] = useState<DCAConfig | null>(null);

  const days = config
    ? calculateDaysBetween(
      config.startDate,
      config.endDate
    )
    : 0;

  const {
    data: historicalData,
    isLoading,
    isError,
    error,
  } = useHistoricalData(
    config?.assetId ?? "",
    days
  );

  const summary =
    config && historicalData
      ? runDCASimulation(
        config,
        historicalData
      )
      : null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5 md:space-y-6"
    >
      <motion.div variants={item}>
        <DCAHeader />
      </motion.div>

      <motion.div variants={item}>
        <DCAControls
          onSubmit={setConfig}
        />
      </motion.div>

      <motion.div variants={item}>
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading historical data...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            {
              error instanceof Error
                ? error.message
                : "Failed to fetch historical data"
            }
          </p>
        )}

        {summary && (
          <DcaSummaryCards
            summary={summary}
          />
        )}
      </motion.div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 gap-5 xl:grid-cols-2 mt-5"
      >
        <DCAPortfolioGrowthChart />
        <DCAPriceChart />
      </motion.div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 gap-5 xl:grid-cols-3 mt-5"
      >
        <div className="xl:col-span-1">
          <DCAAnalytics />
        </div>

        <div className="xl:col-span-2">
          <DCAHistoryTable />
        </div>
      </motion.div>
    </motion.div>
  );
}
