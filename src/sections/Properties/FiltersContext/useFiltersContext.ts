import { useContext } from "react";
import { FiltersContext } from ".";

const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "FiltersContext value is undefined. Make sure you use the FiltersContext Provider before using the context."
        );
    }
    return context;
};

export default useFiltersContext;
