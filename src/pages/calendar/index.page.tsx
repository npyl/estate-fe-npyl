import AuthGuard from "@/components/authentication/auth-guard";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
const CalendarSection = dynamic(() => import("@/sections/Calendar"), {
    ssr: false,
});
import { NextPage } from "next";
import dynamic from "next/dynamic";

const CalendarPage: NextPage = () => {
    return <CalendarSection />;
};

CalendarPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CalendarPage;
