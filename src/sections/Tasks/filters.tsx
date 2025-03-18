import { BoardFiltersReq } from "@/types/tasks";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { TSorting } from "../Filters/SortBy/types";
import { useRouter } from "next/router";

type FiltersState = Omit<BoardFiltersReq, "search"> & {
    search: string; // INFO: required to avoid undefined as initial value
    setSearch: Dispatch<SetStateAction<string>>;
    setAssigneeId: Dispatch<SetStateAction<number | undefined>>;
    setLabels: Dispatch<SetStateAction<number[]>>;
    setPriority: Dispatch<SetStateAction<number | undefined>>;

    sorting?: TSorting;
    setSorting: Dispatch<SetStateAction<TSorting | undefined>>;
};

const FiltersContext = createContext<FiltersState>({
    search: "",
    setSearch: () => {},
    setAssigneeId: () => {},
    setLabels: () => {},
    setPriority: () => {},

    sorting: undefined,
    setSorting: () => {},
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
    const router = useRouter();
    const { isReady, query } = router;
    const assignee = query.assignee;

    const [search, setSearch] = useState("");

    const [assigneeId, setAssigneeId] = useState<number | undefined>(undefined);

    const [priority, setPriority] = useState<number>();
    const [labels, setLabels] = useState<number[]>([]);

    const [sorting, setSorting] = useState<TSorting>();

    useEffect(() => {
        if (isReady && assignee && !isNaN(Number(assignee))) {
            setAssigneeId(Number(assignee));
        }
    }, [isReady, assignee]);

    return (
        <FiltersContext.Provider
            value={{
                search,
                assigneeId,
                priority,
                labels,
                sorting,
                // ...
                setSearch,
                setAssigneeId,
                setPriority,
                setLabels,
                setSorting,
            }}
            {...props}
        />
    );
};
