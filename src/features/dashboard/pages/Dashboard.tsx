import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStatsGrid from "../components/DashboardStatsGrid";
import MarketOverview from "../components/MarketOverview";
import PortfolioPerformance from "../components/PortfolioPerformance";
import { TopHoldings } from "../components/TopHoldings";
import { RecentActivity } from "../components/RecentActivity";
import FooterBanner from "../components/FooterBanner";

export default function Dashboard() {
    return (
        <React.Fragment>
            <DashboardHeader />
            <DashboardStatsGrid />
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                    <MarketOverview />
                </div>
                <PortfolioPerformance />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <TopHoldings />
                <RecentActivity />
            </div>
            <FooterBanner />
        </React.Fragment>
    )
}
