import { useGetAgreementByIdQuery } from "@/services/agreements";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";
import { FC } from "react";

interface LabelProps {
    agreementId: number;
}

const Label: FC<LabelProps> = ({ agreementId }) => {
    const { t } = useTranslation();
    const { data } = useGetAgreementByIdQuery(agreementId);
    return `${t("Agreement")} ${data?.code || ""}`;
};

const getTab = (agreementId: number): ITab => ({
    path: `/agreements/${agreementId}`,
    label: <Label agreementId={agreementId} />,
});

const AgreementPusher = () => {
    const router = useRouter();
    const { agreementId } = router.query;
    return <Pusher tab={getTab(+agreementId!)} />;
};

export default AgreementPusher;
