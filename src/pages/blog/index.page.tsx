import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ViewAllPublicSites from "@/sections/Blog/PublicSites";

const Blog: NextPage = () => <ViewAllPublicSites />;

Blog.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Blog;
