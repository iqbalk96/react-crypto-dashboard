import { motion } from "framer-motion";
import { DCAHeader } from "../components/dca-header";
import { DCAControls } from "../components/dca-control";
import { DCASummaryCards } from "../components/dca-summary-card";
import { DCAPortfolioGrowthChart } from "../components/dca-portfolio-growth";
import { DCAPriceChart } from "../components/dca-price-chart";
import { DCAAnalytics } from "../components/dca-analytics";
import { DCAHistoryTable } from "../components/dca-history";

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
        <DCAControls />
      </motion.div>

      <motion.div variants={item}>
        <DCASummaryCards />
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
