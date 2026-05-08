import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStatsGrid from "../components/DashboardStatsGrid";

export default function Dashboard() {
    return (
        <React.Fragment>
            <DashboardHeader />
            <DashboardStatsGrid />
        </React.Fragment>
    )
}
