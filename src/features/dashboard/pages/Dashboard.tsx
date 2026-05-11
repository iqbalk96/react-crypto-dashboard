import React from "react";

import DashboardHeader from "../components/DashboardHeader";
import DashboardStatsGrid from "../components/DashboardStatsGrid";

import MarketOverview from "../components/MarketOverview";
import PortfolioPerformance from "../components/PortfolioPerformance";

import { MarketExposure } from "../components/TopHoldings";
import { RecentActivity } from "../components/RecentActivity";

import FooterBanner from "../components/FooterBanner";

export default function Dashboard() {
    return (
        <React.Fragment>
            <DashboardHeader />

            <DashboardStatsGrid />

            {/* Main Analytics */} 
            <MarketOverview />
            
            <PortfolioPerformance />

            {/* Holdings + Activity */}
            <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
                <div className="min-w-0">
                    <MarketExposure />
                </div>

                <div className="min-w-0">
                    <RecentActivity />
                </div>
            </div>

            {/* AI Insight */}
            <FooterBanner />
        </React.Fragment>
    );
}