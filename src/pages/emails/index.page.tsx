import ErrorBoundary from "@/_private/ErrorBoundary";
import AdminGuard from "@/components/authentication/admin-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAll from "@/sections/Emails";
import ErrorComponent from "@/sections/Emails/Error";
import { NextPage } from "next";

const EmailsPage: NextPage = () => <ViewAll />;

EmailsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>
            <ErrorBoundary ErrorComponent={ErrorComponent}>
                {page}
            </ErrorBoundary>
        </AdminGuard>
    </DashboardLayout>
);

export default EmailsPage;
