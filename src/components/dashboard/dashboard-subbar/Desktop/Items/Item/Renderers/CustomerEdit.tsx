import { useGetCustomerByIdQuery } from "src/services/customers";
import { FC } from "react";
import { ITabRendererProps } from "../types";

const CustomerEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data: c } = useGetCustomerByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { firstName, lastName } = c || {};
    const fullname = firstName && lastName ? `${firstName} ${lastName}` : "";
    return fullname;
};

export default CustomerEdit;
