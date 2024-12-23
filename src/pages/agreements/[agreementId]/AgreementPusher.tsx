import { agreements } from "@/services/agreements";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Pusher from "@/sections/Pusher";
import { TranslationType } from "@/types/translation";
import { dispatch } from "@/store";
import { ITab } from "@/types/tabs";
import { FC } from "react";

interface LabelProps {
    code?: string;
}

const Label: FC<LabelProps> = ({ code }) => {
    const { t } = useTranslation();
    return `${t("Agreement")} ${code || ""}`;
};

const getTab = async (t: TranslationType, id: number): Promise<ITab> => {
    const { data: a } = await dispatch(
        agreements.endpoints.getAgreementById.initiate(id)
    );

    return {
        path: `/agreements/${id}`,
        label: <Label code={a?.code} />,
    };
};

const AgreementPusher = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { agreementId } = router.query;
    return <Pusher tabPromise={getTab(t, +agreementId!)} />;
};

export default AgreementPusher;
