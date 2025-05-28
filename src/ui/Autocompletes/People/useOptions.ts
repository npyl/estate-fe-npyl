import { useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import { ICustomerMini } from "@/types/customer";
import { IUser } from "@/types/user";
import { useAllUsersQuery } from "@/services/user";

const useOptions = (
    customerOptionFilter: ((c: ICustomerMini) => boolean) | undefined,
    managerOptionFilter: ((m: IUser) => boolean) | undefined
) => {
    const { data: customers, isLoading: isLoading0 } = useGetNamesQuery();
    const { data: users, isLoading: isLoading1 } = useAllUsersQuery();

    const options = useMemo(
        () => [
            ...((customerOptionFilter
                ? customers?.filter(customerOptionFilter)
                : customers) ?? []),
            ...((managerOptionFilter
                ? users?.filter(managerOptionFilter)
                : users) ?? []),
        ],
        [customers, users, customerOptionFilter, managerOptionFilter]
    );

    const isLoading = isLoading0 || isLoading1;

    return [options, { isLoading }] as const;
};

export default useOptions;
