import { BlogFilters } from "@/types/company";
import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";

type State = {
    filters: BlogFilters;
    setSearch: Dispatch<SetStateAction<string>>;
};

const FiltersContext = createContext<State | undefined>(undefined);

export const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "FiltersContext value is undefined. Make sure you use the FiltersContext before using the context."
        );
    }
    return context;
};

interface ProviderProps extends PropsWithChildren {}

const FiltersProvider: FC<ProviderProps> = ({ children }) => {
    const [search, setSearch] = useState("");
    const filters = { search };
    return (
        <FiltersContext.Provider value={{ filters, setSearch }}>
            {children}
        </FiltersContext.Provider>
    );
};

export default FiltersProvider;
