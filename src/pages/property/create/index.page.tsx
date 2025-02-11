import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import PropertyPusher from "@/sections/Properties/Create/Pusher";
import PropertyCreate from "@/sections/Properties/Create";

const CreatePropertyPage: NextPage = () => <PropertyCreate />;

CreatePropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <PropertyPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default CreatePropertyPage;
