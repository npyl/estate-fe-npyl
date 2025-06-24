import AuthGuard from "@/components/authentication/auth-guard";
import BlogViewByPublicId from "@/sections/Blog/ViewById";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { toNumberSafe } from "@/utils/toNumber";
import { NextPage } from "next";
import { useRouter } from "next/router";

const BlogByPublicIdPage: NextPage = () => {
    const router = useRouter();
    const { publicId } = router.query;
    const iPublicId = toNumberSafe(publicId);
    if (iPublicId === -1) return null;
    return <BlogViewByPublicId publicId={iPublicId} />;
};

BlogByPublicIdPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default BlogByPublicIdPage;
