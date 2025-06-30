import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ViewAllPosts from "@/sections/Blog/ViewAll";

const ViewAllPostsPage: NextPage = () => <ViewAllPosts />;

ViewAllPostsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default ViewAllPostsPage;
