import { useRouter } from "next/router";
import { useGetCustomerByIdQuery } from "src/services/customers";

const useGetCustomer = () => {
    const { customerId } = useRouter().query;
    const { data: customer, isLoading } = useGetCustomerByIdQuery(+customerId!);
    return { customerId, customer, isLoading };
};

export default useGetCustomer;
