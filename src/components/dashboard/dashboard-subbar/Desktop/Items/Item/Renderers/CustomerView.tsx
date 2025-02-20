import { useGetCustomerByIdQuery } from "src/services/customers";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const CustomerView: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetCustomerByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { firstName, lastName } = data || {};
    const fullname = firstName && lastName ? `${firstName} ${lastName}` : "";
    return fullname;
};

export default CustomerView;
