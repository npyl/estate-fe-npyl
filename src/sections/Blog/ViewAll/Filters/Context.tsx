import { createContext, FC, PropsWithChildren, useContext } from "react";

type State = {};

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
    return (
        <FiltersContext.Provider value={{}}>{children}</FiltersContext.Provider>
    );
};

export default FiltersProvider;
