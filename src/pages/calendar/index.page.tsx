import { NextPage } from "next";
import { Paper } from "@mui/material";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import CalendarView from "./CalendarView";

const CalendarPage: NextPage = () => {
    return (
        <Paper
            sx={{
                mt: 2,
                mb: 1,
                padding: 1,
            }}
        >
            <CalendarView />
        </Paper>
    );
};

CalendarPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CalendarPage;
