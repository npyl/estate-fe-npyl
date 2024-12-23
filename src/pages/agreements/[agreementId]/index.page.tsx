import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useGetAgreementByIdQuery } from "@/services/agreements";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Skeleton from "./Skeleton";
import Description from "./Description";
import dynamic from "next/dynamic";
import AgreementPusher from "./AgreementPusher";
const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const ViewAgreementPage: NextPage = () => {
    const router = useRouter();
    const { agreementId } = router.query;

    const { data: agreement, isLoading } = useGetAgreementByIdQuery(
        +agreementId!
    );

    if (isLoading || !agreement) return <Skeleton />;

    return (
        <>
            <Description a={agreement} />
            <PDFViewer a={agreement} />
        </>
    );
};

ViewAgreementPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <AgreementPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default ViewAgreementPage;
