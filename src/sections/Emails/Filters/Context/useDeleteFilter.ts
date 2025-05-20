import { IEmailFilters } from "@/types/email";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { INITIAL_STATE } from "./constants";
import { Setters } from "./types";

type SetterMap = {
    [K in keyof IEmailFilters]: Dispatch<SetStateAction<IEmailFilters[K]>>;
};

interface InitialValues {
    propertyId?: number;
    _to?: string;
}

const useDeleteFilter = (
    { setFrom, setPropertyIds, setSearch, setTo, setToFreeSoloed }: Setters,
    isPropertyPage: boolean,
    isCustomerPage: boolean,
    { propertyId, _to }: InitialValues
) => {
    const SETTERS: SetterMap = useMemo(
        () => ({
            from: setFrom,
            propertyIds: setPropertyIds,
            search: setSearch,
            to: setTo,
        }),
        [setFrom, setPropertyIds, setSearch, setTo]
    );

    const deleteFilter = useCallback(
        (key: keyof IEmailFilters) => {
            if (key === "propertyIds" && isPropertyPage) {
                setPropertyIds([propertyId!]);
                return;
            }

            if (key === "to") setToFreeSoloed([]);
            if (key === "to" && isCustomerPage) {
                setTo([_to!]);
                return;
            }

            SETTERS[key](INITIAL_STATE[key] as any);
        },
        [SETTERS, isPropertyPage, isCustomerPage, propertyId, _to]
    );

    return deleteFilter;
};

export default useDeleteFilter;
