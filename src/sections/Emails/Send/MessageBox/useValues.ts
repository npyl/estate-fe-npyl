import { useMemo } from "react";
import { TMessageBoxValues } from "./types";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { useGetNamesQuery } from "@/services/customers";

const useValues = () => {
    const { filters } = useFiltersContext();
    const { to: _to, propertyIds } = filters;

    const { data } = useGetNamesQuery();
    const calculated = useMemo(() => {
        if (!_to)
            return {
                to: [],
                toFreeSoloed: [],
            };

        const didFind = data?.find(({ email }) => email === _to);
        if (!didFind)
            return {
                to: [],
                toFreeSoloed: [_to],
            };

        return {
            to: [_to],
            toFreeSoloed: [],
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
