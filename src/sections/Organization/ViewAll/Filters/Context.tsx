import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { IOrganizationFilter } from "@/types/organization";

type TSetters = {
    setSearch: Dispatch<SetStateAction<string>>;
};

type FiltersState = { filters: IOrganizationFilter } & TSetters;

const FiltersContext = createContext<FiltersState | undefined>(undefined);

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

    const filters = {
        search,
    };

    return (
        <FiltersContext.Provider
            value={{
                filters,
                setSearch,
            }}
            {...props}
        />
    );
};
