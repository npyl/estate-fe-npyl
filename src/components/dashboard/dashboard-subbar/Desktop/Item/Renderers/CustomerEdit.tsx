import { useGetCustomerByIdQuery } from "src/services/customers";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const CustomerEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();

    const { data: c } = useGetCustomerByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });

    const { firstName, lastName } = c || {};

    const fullname =
        firstName && lastName
            ? `${firstName} ${lastName}`
            : t("Customer_geniki");

    return fullname;
};

export default CustomerEdit;
