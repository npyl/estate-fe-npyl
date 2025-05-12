import { useMemo } from "react";
import { TMessageBoxValues } from "./types";
import { useGetNamesQuery } from "@/services/customers";
import { ICustomerMini } from "@/types/customer";

const isCustomer = (data?: ICustomerMini[]) => (e: string) =>
    data?.find(({ email }) => e === email) ?? [];
const notCustomer = (data?: ICustomerMini[]) => (e: string) =>
    data?.find(({ email }) => e !== email) ?? [];

const useValues = (_to: string[], propertyIds: number[]) => {
    const { data } = useGetNamesQuery();
    const calculated = useMemo(() => {
        if (!_to)
            return {
                to: [],
                toFreeSoloed: [],
            };

        const to = _to.filter(isCustomer(data));
        const toFreeSoloed = _to.filter(notCustomer(data));

        return {
            to,
            toFreeSoloed,
        };
    }, [_to]);

    const values: TMessageBoxValues = useMemo(
        () => ({
            subject: "",
            body: "",
            ...calculated,
            propertyIds: propertyIds ?? [],
        }),
        [calculated, propertyIds]
    );

    return values;
};

export default useValues;
