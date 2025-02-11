import { useGetCustomerByIdQuery } from "src/services/customers";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const CustomerView: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const { data } = useGetCustomerByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { firstName, lastName } = data || {};
    if (!firstName && !lastName) return t("Customer");
    const fullname = `${firstName || ""} ${lastName || ""}`;
    return fullname;
};

export default CustomerView;
