import { Paper, Stack } from "@mui/material";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import * as React from "react";
import ViewsChart from "./LiveViews";
import PropertyViewLineChart from "./Views";
import CategoryViewsBarChart from "./CategoryViews";
import PopularProperties from "./Popular";

const CHARTS = [
    <ViewsChart key="ViewsChart" />,
    <PropertyViewLineChart key="PropertyViewChart" />,
    <CategoryViewsBarChart key="CategoryViewsBarChart" />,
    <PopularProperties key="PopularPropertiesChart" />,
];

const Statistics: NextPage = () => (
    <Stack spacing={2}>
        {CHARTS.map((C, i) => (
            <Paper sx={{ p: 1 }} key={i}>
                {C}
            </Paper>
        ))}
    </Stack>
);

Statistics.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Statistics;
