import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import CalendarSection from "@/sections/Calendar";
import { NextPage } from "next";

const CalendarPage: NextPage = () => {
    return <CalendarSection />;
};

CalendarPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CalendarPage;
