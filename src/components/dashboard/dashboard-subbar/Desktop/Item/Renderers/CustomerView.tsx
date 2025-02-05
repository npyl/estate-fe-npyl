import { useGetCustomerByIdQuery } from "src/services/customers";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const CustomerView: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetCustomerByIdQuery(resourceId);
    const { firstName, lastName } = data || {};
    return `${t("Customer")} ${firstName || ""} ${lastName || ""}`;
};

export default CustomerView;
