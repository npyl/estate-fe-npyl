import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";

const PropertyView: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    return data?.code || t("Property");
};

export default PropertyView;
