import AuthGuard from "@/components/authentication/auth-guard";
import BlogViewByPublicId from "@/sections/Blog/ViewById";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import toNumberSafe from "@/utils/toNumberSafe";
import { NextPage } from "next";
import { useRouter } from "next/router";

const BlogByPublicIdPage: NextPage = () => {
    const router = useRouter();
    const { postId } = router.query;
    const iPostId = toNumberSafe(postId);
    if (iPostId === -1) return null;
    return <BlogViewByPublicId postId={iPostId} />;
};

BlogByPublicIdPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default BlogByPublicIdPage;
