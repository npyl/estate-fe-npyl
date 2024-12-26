import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import Form from "./Form";
import dynamic from "next/dynamic";
import { useGetProperty } from "@/hooks/property";
const PropertyPusher = dynamic(
    () => import("@/sections/Properties/Edit/PropertyPusher")
);

const EditPropertyPage: NextPage = () => {
    const { property } = useGetProperty();
    return <Form property={property} />;
};

EditPropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <PropertyPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default EditPropertyPage;
