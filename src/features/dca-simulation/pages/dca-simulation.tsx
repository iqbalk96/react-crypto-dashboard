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
import { DCASummary } from "../types/dca-summary.types";

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


const generateMockSummary = (
  config: DCAConfig
): DCASummary => {
  const totalPurchases = 24;

  const totalInvested =
    totalPurchases *
    config.investmentAmount;

  const currentValue =
    totalInvested * 1.53;

  const totalReturn =
    currentValue -
    totalInvested;

  return {
    totalInvested,

    currentValue,

    totalReturn,

    totalReturnPercentage: 53.5,

    totalUnitsAccumulated: 0.2142,

    averageBuyPrice: 42180,

    totalPurchases,

    averageBuyVsCurrent: -12.4,
  };
};


export default function DcaSimulationPage() {
  
  const [config, setConfig] = useState<DCAConfig | null>(null);
  const summary = config
    ? generateMockSummary(config)
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
