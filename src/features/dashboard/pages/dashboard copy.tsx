import DashboardHeader from "../components/DashboardHeader";
import DashboardStatsGrid from "../components/DashboardStatsGrid";

import MarketOverview from "../components/MarketOverview";
import PortfolioPerformance from "../components/PortfolioPerformance";

import { MarketExposure } from "../components/TopHoldings";
import { RecentActivity } from "../components/RecentActivity";

import FooterBanner from "../components/FooterBanner";

import { motion } from "framer-motion";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
};


export default function Dashboard() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
        >
            <motion.div variants={item}>
                <DashboardHeader />
            </motion.div>

            <motion.div variants={item}>
                <DashboardStatsGrid />
            </motion.div>

            <motion.div variants={item}>
                <MarketOverview />
            </motion.div>

            <motion.div variants={item}>
                <PortfolioPerformance />
            </motion.div>

            <motion.div
                variants={item}
                className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]"
            >
                <div className="min-w-0">
                    <MarketExposure />
                </div>

                <div className="min-w-0">
                    <RecentActivity />
                </div>
            </motion.div>

            <motion.div variants={item}>
                <FooterBanner />
            </motion.div>
        </motion.div>
    );
}