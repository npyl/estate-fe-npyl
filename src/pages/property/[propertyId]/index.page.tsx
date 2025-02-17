import PropertyById from "@/sections/Properties/ViewById";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import AuthGuard from "@/components/authentication/auth-guard";

import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
const PropertyPusher = dynamic(
    () => import("@/sections/Properties/ViewById/PropertyPusher")
);

// -----------------------------------------------------------------

const SingleProperty: NextPage = () => <PropertyById />;

SingleProperty.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <PropertyPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default SingleProperty;
