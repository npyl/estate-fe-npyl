import MessagesGuard from "@/components/authentication/messages-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import MessagesSection from "@/sections/Messages/Section";
import { NextPage } from "next";

const MessagesPage: NextPage = () => <MessagesSection />;

MessagesPage.getLayout = (page) => (
    <DashboardLayout>
        <MessagesGuard>{page}</MessagesGuard>
    </DashboardLayout>
);

export default MessagesPage;
