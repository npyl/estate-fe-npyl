import type { NextPage } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import AuthGuard from "@/components/authentication/auth-guard";
import ViewById from "@/sections/Organization/ViewById";
import { useRouter } from "next/router";

const OrganizationByIdPage: NextPage = () => {
    const router = useRouter();
    const { organizationId } = router.query;
    return <ViewById id={+organizationId!} />;
};

OrganizationByIdPage.getLayout = (page) => (
    <DashboardLayout>
        <AuthGuard>{page}</AuthGuard>
    </DashboardLayout>
);

export default OrganizationByIdPage;
