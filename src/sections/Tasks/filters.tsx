import { BoardFiltersReq } from "@/types/tasks";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type FiltersState = Omit<BoardFiltersReq, "search"> & {
    search: string; // INFO: required to avoid undefined as initial value
    setSearch: Dispatch<SetStateAction<string>>;
    setAssigneeId: Dispatch<SetStateAction<number | undefined>>;
    setPriority: Dispatch<SetStateAction<number | undefined>>;
};

const FiltersContext = createContext<FiltersState>({
    search: "",
    setSearch: () => {},
    setAssigneeId: () => {},
    setPriority: () => {},
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
    const [search, setSearch] = useState("");
    const [assigneeId, setAssigneeId] = useState<number>();
    const [priority, setPriority] = useState<number>();

    return (
        <FiltersContext.Provider
            value={{
                search,
                assigneeId,
                priority,
                // ...
                setSearch,
                setAssigneeId,
                setPriority,
            }}
            {...props}
        />
    );
};
