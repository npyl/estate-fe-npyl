import Subbar from "@/components/dashboard/dashboard-subbar";
import StyledMenu from "@/components/StyledMenu";
import { Button, Grid, MenuItem, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { t } from "i18next";
import type { NextPage } from "next";
import { BsPlusCircle } from "react-icons/bs";
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
