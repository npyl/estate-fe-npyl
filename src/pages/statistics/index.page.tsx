import { Paper } from "@mui/material";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";

const Statistics: NextPage = () => {
    return (
        <>
            <Paper
                sx={{
                    mt: 2,
                    mb: 1,
                    padding: 1,
                }}
            ></Paper>
        </>
    );
};

Statistics.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Statistics;
