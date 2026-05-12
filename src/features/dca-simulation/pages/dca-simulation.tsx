import React from "react"
import { DCAHeader } from "../components/dca-header"
import { DCAControls } from "../components/dca-control"
import { DCASummaryCards } from "../components/dca-summary-card"
import { DCAPortfolioGrowthChart } from "../components/dca-portfolio-growth"
import { DCAPriceChart } from "../components/dca-price-chart"
import { DCAAnalytics } from "../components/dca-analytics"
import { DCAHistoryTable } from "../components/dca-history"

const DcaSimulationPage = () => {
    return (
        <React.Fragment>
            <DCAHeader />
            <DCAControls />
            <DCASummaryCards />
            <div className="grid gap-5 lg:grid-cols-2">
                <DCAPortfolioGrowthChart />
                <DCAPriceChart />
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <DCAAnalytics />
                </div>

                <div className="lg:col-span-2">
                    <DCAHistoryTable />
                </div>
            </div>
        </React.Fragment>
    )
}

export default DcaSimulationPage