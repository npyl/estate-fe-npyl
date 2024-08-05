import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useGetAgreementByIdQuery } from "@/services/agreements";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Skeleton from "./Skeleton";
import PDFViewer from "./PDFViewer";
import Description from "./Description";
import { useTabsContext } from "@/contexts/tabs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ViewAgreementPage: NextPage = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { agreementId } = router.query;

    const { pushTab } = useTabsContext();

    const { data: agreement, isLoading } = useGetAgreementByIdQuery(
        +agreementId!
    );

    useEffect(() => {
        if (agreement && agreementId) {
            pushTab({
                path: `/agreements/${agreementId}`,
                id: agreementId as string,
                label: `${t("Agreement")} ${agreement?.code}`,
            });
        }
    }, [agreement, agreementId, t]);

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
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default ViewAgreementPage;
