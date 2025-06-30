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
    setSites: Dispatch<SetStateAction<number[]>>;
    setPublished: Dispatch<SetStateAction<boolean | undefined>>;
    setUsers: Dispatch<SetStateAction<number[]>>;
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
    const [sites, setSites] = useState<number[]>([]);
    const [published, setPublished] = useState<boolean>();
    const [users, setUsers] = useState<number[]>([]);
    const filters = { search, sites, published, users };
    return (
        <FiltersContext.Provider
            value={{ filters, setSearch, setSites, setPublished, setUsers }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

export default FiltersProvider;
