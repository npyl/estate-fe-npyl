import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { TTypeFilter } from "./types";
import { TCalendarIdFilter } from "@/types/calendar";

type FiltersState = {
    type: TTypeFilter;
    setType: Dispatch<SetStateAction<TTypeFilter>>;
    calendarId?: TCalendarIdFilter;
    setCalendarId: (v: TCalendarIdFilter) => void;
};

const FiltersContext = createContext<FiltersState>({
    type: "ANY",
    setType() {},
    setCalendarId() {},
});

export const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "FiltersContext value is undefined. Make sure you use the FiltersContext before using the context."
        );
    }
    return context;
};

export const FiltersProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const [type, setType] = useState<TTypeFilter>("ANY");
    const [calendarId, setCalendarId] = useState<TCalendarIdFilter>("");

    return (
        <FiltersContext.Provider
            value={{
                type,
                setType,
                calendarId,
                setCalendarId,
            }}
            {...props}
        />
    );
};
