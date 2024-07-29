import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useGetAgreementByIdQuery } from "@/services/agreements";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Skeleton from "./Skeleton";
import PDFViewer from "./PDFViewer";
import Description from "./Description";

const ViewAgreementPage: NextPage = () => {
    const router = useRouter();
    const { agreementId } = router.query;

    const { data: agreement, isLoading } = useGetAgreementByIdQuery(
        +agreementId!
    );

    const { variant, language } = agreement || {};

    if (isLoading) return <Skeleton />;

    return (
        <>
            <Description a={agreement!} />
            <PDFViewer variant={variant?.key!} language={language?.key!} />
        </>
    );
};

ViewAgreementPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default ViewAgreementPage;
