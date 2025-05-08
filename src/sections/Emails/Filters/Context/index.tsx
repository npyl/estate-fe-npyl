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
    from: string;
    to?: number;
    propertyIds: number[];

    setFrom: Dispatch<SetStateAction<string>>;
    setTo: Dispatch<SetStateAction<number | undefined>>;
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

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState<number>();
    const [propertyIds, setPropertyIds] = useState<number[]>([]);

    return (
        <FiltersContext.Provider
            value={{
                from,
                to,
                propertyIds,
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
