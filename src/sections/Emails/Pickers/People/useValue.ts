import { ICustomerMini } from "@/types/customer";
import { useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import { useAllUsersQuery } from "@/services/user";

const reduceValue =
    (data?: ICustomerMini[]) => (acc: number[], toEmail: string) => {
        const cId = data?.find(({ email }) => email === toEmail)?.id;
        if (Boolean(cId)) acc.push(cId!);
        return acc;
    };

const useValue = (people: string[]) => {
    const { data: customers } = useGetNamesQuery();
    const { data: users } = useAllUsersQuery();
    const data = useMemo(
        () => [...(customers ?? []), ...(users ?? [])],
        [customers, users]
    );
    return useMemo(() => people.reduce(reduceValue(data), []), [people, data]);
};

export default useValue;
