import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewById from "@/sections/Emails/ViewById";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EmailByIdPage: NextPage = () => {
    const router = useRouter();
    const { emailId } = router.query;
    return <ViewById id={emailId as string} />;
};

EmailByIdPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>
            <IsAuthenticatedGuard>{page}</IsAuthenticatedGuard>
        </AdminGuard>
    </DashboardLayout>
);

export default EmailByIdPage;
