import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type FiltersState = {
    search: string;
    assigneeId?: number;

    setSearch: Dispatch<SetStateAction<string>>;
    setAssigneeId: Dispatch<SetStateAction<number | undefined>>;
};

const FiltersContext = createContext<FiltersState>({
    search: "",
    setSearch: () => {},
    setAssigneeId: () => {},
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

    return (
        <FiltersContext.Provider
            value={{
                search,
                assigneeId,
                // ...
                setSearch,
                setAssigneeId,
            }}
            {...props}
        />
    );
};
