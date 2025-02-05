import { useGetAgreementByIdQuery } from "@/services/agreements";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const Agreement: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetAgreementByIdQuery(resourceId);
    return `${t("Agreement")} ${data?.code || ""}`;
};

export default Agreement;
