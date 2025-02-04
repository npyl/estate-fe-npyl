import { Typography, Skeleton } from "@mui/material";
import useCustomerExists from "./useCustomerExists";
import CustomerLink from "./CustomerLink";
import useGetNotification from "@/sections/Notification/useGetNotification";

const CustomerName = () => {
    const { notification } = useGetNotification();
    const { customerEmail, customerName } = notification || {};

    const { customer, didFound, isLoading } = useCustomerExists(customerEmail);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    if (!didFound) return <Typography>{customerName}</Typography>;

    return <CustomerLink c={customer} />;
};

export default CustomerName;
