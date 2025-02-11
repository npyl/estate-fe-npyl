import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";

const PropertyEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { code } = data || {};
    return code || t("Property_geniki");
};

export default PropertyEdit;
