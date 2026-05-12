import React from "react";

import { DCAHeader } from "../components/dca-header";
import { DCAControls } from "../components/dca-control";
import { DCASummaryCards } from "../components/dca-summary-card";
import { DCAPortfolioGrowthChart } from "../components/dca-portfolio-growth";
import { DCAPriceChart } from "../components/dca-price-chart";
import { DCAAnalytics } from "../components/dca-analytics";
import { DCAHistoryTable } from "../components/dca-history";

const DcaSimulationPage = () => {
  return (
    <React.Fragment>
      <div className="space-y-5 md:space-y-6">
        {/* Header */}
        <DCAHeader />

        {/* Controls */}
        <DCAControls />

        {/* Summary */}
        <DCASummaryCards />

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 mt-5">
          <DCAPortfolioGrowthChart />

          <DCAPriceChart />
        </div>

        {/* Analytics + Table */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 mt-5">
          <div className="xl:col-span-1">
            <DCAAnalytics />
          </div>

          <div className="xl:col-span-2">
            <DCAHistoryTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DcaSimulationPage;