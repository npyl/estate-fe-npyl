import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import MessagesSection from "@/sections/Messages/Section";
import { NextPage } from "next";

const MessagesPage: NextPage = () => <MessagesSection />;

MessagesPage.getLayout = (page) => (
    <DashboardLayout>
        <AuthGuard>{page}</AuthGuard>
    </DashboardLayout>
);

export default MessagesPage;
