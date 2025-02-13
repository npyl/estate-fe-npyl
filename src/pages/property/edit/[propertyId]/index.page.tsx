import type { NextPage } from "next";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import dynamic from "next/dynamic";
import EditById from "@/sections/Properties/Edit";
const PropertyPusher = dynamic(
    () => import("@/sections/Properties/Edit/PropertyPusher")
);

const EditPropertyPage: NextPage = () => <EditById />;

EditPropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <PropertyPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default EditPropertyPage;
