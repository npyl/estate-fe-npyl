import { useGetCustomerByIdQuery } from "src/services/customers";
import { FC } from "react";
import { ITabRendererProps } from "../types";
import isFalsy from "@/utils/isFalsy";

const CustomerEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data: c } = useGetCustomerByIdQuery(resourceId!, {
        skip: isFalsy(resourceId),
    });
    const { firstName, lastName } = c ?? {};
    const fullname = firstName && lastName ? `${firstName} ${lastName}` : "";
    return fullname;
};

export default CustomerEdit;
