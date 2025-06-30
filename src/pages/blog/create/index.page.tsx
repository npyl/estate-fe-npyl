import AuthGuard from "@/components/authentication/auth-guard";
import BlogViewByPublicId from "@/sections/Blog/ViewById";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { NextPage } from "next";

const BlogByPublicIdPage: NextPage = () => <BlogViewByPublicId />;

BlogByPublicIdPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default BlogByPublicIdPage;
