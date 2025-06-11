import ManagerAutocomplete from "@/ui/Autocompletes/Manager";
import { useCallback } from "react";
import { useFiltersContext, useSelectUsers } from "./Context";

function FilterLogManager() {
    const { setUsers } = useFiltersContext();
    const ids = useSelectUsers();
    const value = Array.isArray(ids) ? ids.at(0) : -1;

    const handleChange = useCallback((id: number) => {
        setUsers([id]);
    }, []);

    return <ManagerAutocomplete value={value} onChange={handleChange} />;
}

export default FilterLogManager;
