import { useGetCustomerByIdQuery } from "@/services/customers";
import { ICustomer } from "@/types/customer";
import useGetNotification from "@/sections/Notification/useGetNotification";

/**
 * @param customerId
 * @returns A customer with demands equal to the ones before plus one more appended (coming from Stay Updated)
 */
const useCustomerWithUpdatedDemands = (
    customerId: number = -1
): ICustomer | undefined => {
    // Fetch customer
    const { data } = useGetCustomerByIdQuery(customerId, {
        skip: customerId === -1,
    });

    // Fetch relative notification
    const { notification } = useGetNotification();
    const demand = notification?.stayUpdatedDetails?.customerDemand;

    if (!data) return;
    if (!demand) return;

    // Prepare demands by appending the new one
    const old = data.demands || [];
    const demands = [...old, demand];

    return { ...data, demands };
};

export default useCustomerWithUpdatedDemands;
