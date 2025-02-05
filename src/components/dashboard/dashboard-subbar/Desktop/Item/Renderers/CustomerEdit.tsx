import { useGetCustomerByIdQuery } from "src/services/customers";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const CustomerEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();

    const { data: c } = useGetCustomerByIdQuery(resourceId);

    const { createdAt, updatedAt, firstName, lastName } = c || {};

    const isFirstEdit = createdAt === updatedAt;
    const title = isFirstEdit ? t("Create") : t("Edit");
    const fullname = firstName && lastName ? `${firstName} ${lastName}` : "";
    const label = `${title} ${t("Customer_geniki")} ${fullname}`;

    return label;
};

export default CustomerEdit;
