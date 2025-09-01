import { useGetAgreementByIdQuery } from "@/services/agreements";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";
import isFalsy from "@/utils/isFalsy";

const Agreement: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetAgreementByIdQuery(resourceId!, {
        skip: isFalsy(resourceId),
    });
    return data?.code || t("Agreement");
};

export default Agreement;
