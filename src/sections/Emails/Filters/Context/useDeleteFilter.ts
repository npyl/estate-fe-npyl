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
    { setPeople, setPeopleFreeSoloed, setPropertyIds, setSearch }: Setters,
    isPropertyPage: boolean,
    isCustomerPage: boolean,
    { propertyId, _to }: InitialValues
) => {
    const SETTERS: SetterMap = useMemo(
        () => ({
            to: setPeople,
            from: setPeople,
            propertyIds: setPropertyIds,
            search: setSearch,
        }),
        [setPropertyIds, setSearch]
    );

    const deleteFilter = useCallback(
        (key: keyof IEmailFilters) => {
            if (key === "propertyIds" && isPropertyPage) {
                setPropertyIds([propertyId!]);
                return;
            }

            if (key === "to") setPeopleFreeSoloed([]);
            if (key === "to" && isCustomerPage) {
                setPeople([_to!]);
                return;
            }

            if (key === "from") setPeopleFreeSoloed([]);
            if (key === "from" && isCustomerPage) {
                setPeople([_to!]);
                return;
            }

            try {
                SETTERS[key](INITIAL_STATE[key] as any);
            } catch (ex) {}
        },
        [SETTERS, isPropertyPage, isCustomerPage, propertyId, _to]
    );

    return deleteFilter;
};

export default useDeleteFilter;
