import PropertyById from "@/sections/Properties/ViewById";
import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

// -----------------------------------------------------------------

const SingleProperty: NextPage = () => <PropertyById />;

SingleProperty.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default SingleProperty;
