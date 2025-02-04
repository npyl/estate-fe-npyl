import { useFindByEmailQuery } from "@/services/customers";

const useCustomerExists = (email: string = "") => {
    const { data: customer, isLoading } = useFindByEmailQuery(email, {
        skip: !email,
    });
    return { customer, didFound: Boolean(customer), isLoading };
};

export default useCustomerExists;
