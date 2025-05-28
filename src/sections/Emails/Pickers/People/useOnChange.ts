import { ICustomerMini } from "@/types/customer";
import { useCallback } from "react";
import { useGetNamesQuery } from "@/services/customers";

const reduceIdToEmail =
    (data?: ICustomerMini[]) => (acc: string[], toId: number) => {
        const email = data?.find(({ id }) => id === toId)?.email;
        if (email) acc.push(email);
        return acc;
    };

const useOnChange = (_onChange: (v: string[]) => void) => {
    const { data } = useGetNamesQuery();
    return useCallback(
        (ids: number[]) => {
            const found = ids.reduce(reduceIdToEmail(data), []);
            _onChange(found);
        },
        [data]
    );
};

export default useOnChange;
