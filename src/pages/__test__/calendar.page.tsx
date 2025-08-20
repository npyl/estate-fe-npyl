import CalendarTester from "@/sections/__test__/CalendarGoogle";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { NextPage } from "next";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

const CalendarPage: NextPage = () => <CalendarTester />;

CalendarPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CalendarPage;
