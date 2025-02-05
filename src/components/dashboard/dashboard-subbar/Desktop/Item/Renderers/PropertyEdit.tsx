import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";

const PropertyEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetPropertyByIdQuery(resourceId);
    const { code, createdAt, updatedAt } = data || {};

    const isFirstEdit = createdAt === updatedAt;

    const label = `${isFirstEdit ? t("Create") : t("Edit")} ${t(
        "Property_geniki"
    )} ${code || ""}`;

    return label;
};

export default PropertyEdit;
