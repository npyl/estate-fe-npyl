import { Paper } from "@mui/material";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import * as React from "react";
import ViewsChart from "./liveViewsChart";
import PropertyViewLineChart from "./viewsOfProperties";
import CategoryViewsBarChart from "./categoryViewsBarChart";
import PopularProperties from "./popularProperties";

const Statistics: NextPage = () => {
    return (
        <>
            <Paper
                sx={{
                    mt: 2,
                    mb: 1,
                    padding: 1,
                }}
            >
                <ViewsChart />
            </Paper>
            <Paper
                sx={{
                    mt: 2,
                    mb: 1,
                    padding: 1,
                }}
            >
                <PropertyViewLineChart />
            </Paper>
            <Paper
                sx={{
                    mt: 2,
                    mb: 1,
                    padding: 1,
                }}
            >
                <CategoryViewsBarChart />
            </Paper>
            <Paper
                sx={{
                    mt: 2,
                    mb: 1,
                    padding: 2,
                }}
            >
                <PopularProperties />
            </Paper>
        </>
    );
};

Statistics.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Statistics;
