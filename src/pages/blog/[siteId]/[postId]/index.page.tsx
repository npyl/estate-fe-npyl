import AuthGuard from "@/components/authentication/auth-guard";
import BlogViewByPublicId from "@/sections/Blog/ViewById";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { toNumberSafe } from "@/utils/toNumber";
import { NextPage } from "next";
import { useRouter } from "next/router";

const BlogByPublicIdPage: NextPage = () => {
    const router = useRouter();
    const { siteId } = router.query;
    const iSiteId = toNumberSafe(siteId);
    if (iSiteId === -1) return null;
    return <BlogViewByPublicId siteId={iSiteId} />;
};

BlogByPublicIdPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default BlogByPublicIdPage;
