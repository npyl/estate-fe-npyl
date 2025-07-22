import AuthGuard from "@/components/authentication/auth-guard";
import CalendarSection from "@/sections/Calendar";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { NextPage } from "next";

const CalendarPage: NextPage = () => <CalendarSection />;

CalendarPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CalendarPage;
