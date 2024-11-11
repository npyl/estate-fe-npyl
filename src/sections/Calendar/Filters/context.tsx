import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { TTypeFilter } from "./types";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";

type FiltersState = {
    type: TTypeFilter;
    setType: Dispatch<SetStateAction<TTypeFilter>>;
    calendarId?: string;
    setCalendarId: (v: string) => void;
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
    const [calendarId, setCalendarId] = useState<string>("");

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
