import useGetNotification from "@/sections/Notification/useGetNotification";
import { useFindByEmailQuery } from "@/services/customers";

const useCustomerExists = () => {
    const { notification } = useGetNotification();
    const email = notification?.customerEmail || "";

    const { data: customer, isLoading } = useFindByEmailQuery(email, {
        skip: !email,
    });
    return { customer, didFound: Boolean(customer), isLoading };
};

export default useCustomerExists;
