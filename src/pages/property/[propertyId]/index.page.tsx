import PropertyById from "@/sections/Properties/ViewById";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import PropertyPusher from "./PropertyPusher";

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
