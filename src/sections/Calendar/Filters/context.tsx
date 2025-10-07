import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
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

    onDateChange: (d: Date) => void;
};

const FiltersContext = createContext<FiltersState>({
    type: "ANY",
    setType() {},
    setCalendarId() {},
    onDateChange(d) {},
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

interface FiltersProviderProps extends PropsWithChildren {
    onDateChange: (d: Date) => void;
}

export const FiltersProvider: FC<FiltersProviderProps> = ({
    onDateChange,
    ...props
}) => {
    const [type, setType] = useState<TTypeFilter>("ANY");
    const [calendarId, setCalendarId] = useState<TCalendarIdFilter>("");

    return (
        <FiltersContext.Provider
            value={{
                type,
                setType,
                calendarId,
                setCalendarId,
                onDateChange,
            }}
            {...props}
        />
    );
};
