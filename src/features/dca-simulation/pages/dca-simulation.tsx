import { motion } from "framer-motion";
import { DCAHeader } from "../components/dca-header";
import { DCAPortfolioGrowthChart } from "../components/dca-portfolio-growth";
import { DCAPriceChart } from "../components/dca-price-chart";
import { DCAAnalytics } from "../components/dca-analytics";
import { DCAHistoryTable } from "../components/dca-history";
import { DCAControls } from "../components/dca-controls";
import { DcaSummaryCards } from "../components/dca-summary-cards";

import { useState } from "react";

// types
import { DCAConfig } from "../types/domain.types";

import { getErrorMessage } from "../utils/get-error-message";

// custom hooks
import { useDCASimulation } from "../hooks/use-dca-simulation";

// framer motion
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
// end framer motion

export default function DcaSimulationPage() {

  const [config, setConfig] = useState<DCAConfig | null>(null);

  const { result, asset, isLoading, isError, error } =
    useDCASimulation(config);

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
        {/* TODO: refactor using skeleton loading */}
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading historical data...
          </p>
        )}

        {/* TODO: refactpr with global error */}
        {isError && (
          <p className="text-sm text-red-500">
            {getErrorMessage(error)}
          </p>
        )}

        {result && (
          <DcaSummaryCards
            summary={result.summary}
            symbol={asset.symbol}
          />
        )}
      </motion.div>

      {result && (
        <>
          <motion.div
            variants={item}
            className="grid grid-cols-1 gap-5 xl:grid-cols-2 mt-5"
          >
            <DCAPortfolioGrowthChart timeline={result.timeline} />
            <DCAPriceChart
              timeline={result.timeline}
              symbol={asset.symbol}
              name={asset.name}
            />
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-1 gap-5 xl:grid-cols-3 mt-5"
          >
            <div className="xl:col-span-1">
              <DCAAnalytics result={result} symbol={asset.symbol} />
            </div>

            <div className="xl:col-span-2">
              <DCAHistoryTable
                timeline={result.timeline}
                symbol={asset.symbol}
              />
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
