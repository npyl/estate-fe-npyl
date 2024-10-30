import { TGetCellEventsCb } from "@/components/Calendar/types";
import { useFiltersContext } from "../Filters/context";
import { useCallback } from "react";
import { _getTodaysEvents } from "@/components/Calendar/Views/util";

const useFilteredEvents = () => {
    const { type } = useFiltersContext();

    const getCellEvents: TGetCellEventsCb = useCallback(
        (events, date) => {
            if (type === "ANY") return _getTodaysEvents(events, date);

            return _getTodaysEvents(events, date).filter(
                ({ type: _t }) => _t === type
            );
        },
        [type]
    );

    return { getCellEvents };
};

export default useFilteredEvents;
