import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewById from "@/sections/Emails/ViewById";
import { NextPage } from "next";
import { useRouter } from "next/router";

const EmailByIdPage: NextPage = () => {
    const router = useRouter();
    const { emailId } = router.query;
    return <ViewById id={emailId as string} />;
};

EmailByIdPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default EmailByIdPage;
