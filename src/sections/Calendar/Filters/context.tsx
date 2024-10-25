import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { TTypeFilter } from "./types";

type FiltersState = {
    type: TTypeFilter;
    setType: Dispatch<SetStateAction<TTypeFilter>>;
};

const FiltersContext = createContext<FiltersState>({
    type: "ANY",
    setType() {},
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

    return (
        <FiltersContext.Provider
            value={{
                type,
                setType,
            }}
            {...props}
        />
    );
};
