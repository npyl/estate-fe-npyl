import { FC } from "react";
import CustomerLink from "./CustomerLink";
import useCustomerExists from "./useCustomerExists";
import Skeleton from "@mui/material/Skeleton";

interface CustomerLinkWrapProps {
    email: string;
}

const CustomerLinkWrap: FC<CustomerLinkWrapProps> = ({ email }) => {
    const { customer, didFound, isLoading } = useCustomerExists(email);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    if (!didFound) return null;

    return <CustomerLink c={customer} />;
};

export default CustomerLinkWrap;
