import { IEmailFilters } from "@/types/email";
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
    filters: IEmailFilters;

    setFrom: Dispatch<SetStateAction<string>>;
    setTo: Dispatch<SetStateAction<string>>;
    setPropertyIds: Dispatch<SetStateAction<number[]>>;
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

interface ProviderProps extends PropsWithChildren {
    to?: string;
    propertyId?: number;
}

const FiltersProvider: FC<ProviderProps> = ({
    to: _to = "",
    propertyId,
    children,
}) => {
    const _propertyIds = Boolean(propertyId) ? [propertyId!] : [];

    const [from, setFrom] = useState("");
    const [to, setTo] = useState(_to);
    const [propertyIds, setPropertyIds] = useState<number[]>(_propertyIds);

    const filters: IEmailFilters = {
        from,
        to,
        propertyIds,
    };

    return (
        <FiltersContext.Provider
            value={{
                filters,
                // ...
                setFrom,
                setTo,
                setPropertyIds,
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};

export default FiltersProvider;
