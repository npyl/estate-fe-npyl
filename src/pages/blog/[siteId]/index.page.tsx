import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ViewAllPosts from "@/sections/Blog/ViewAll";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";
import BreadcrumbsLayout from "@/sections/Blog/BreadcrumbsLayout";

const ViewAllPostsPage: NextPage = () => {
    const router = useRouter();
    const { siteId } = router.query;
    const iSiteId = toNumberSafe(siteId);
    if (iSiteId === -1) return null;
    return <ViewAllPosts siteId={iSiteId} />;
};

ViewAllPostsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <BreadcrumbsLayout>{page}</BreadcrumbsLayout>
        </DashboardLayout>
    </AuthGuard>
);

export default ViewAllPostsPage;
