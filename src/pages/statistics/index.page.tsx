import { Paper } from "@mui/material";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import * as React from "react";
import ViewsChart from "./barChart";

const Statistics: NextPage = () => {
    return (
        <Paper
            sx={{
                mt: 2,
                mb: 1,
                padding: 1,
            }}
        >
            <ViewsChart />
        </Paper>
    );
};

Statistics.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Statistics;
