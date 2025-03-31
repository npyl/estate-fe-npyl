import { useCallback } from "react";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { useFiltersContext, useManagerId } from "../../FiltersContext";

function ManagerSelect() {
    const managerId = useManagerId();
    const { setManagerId } = useFiltersContext();

    const handleChange = useCallback((id: number) => {
        if (!id) {
            setManagerId(undefined);
            return;
        }

        setManagerId(id);
    }, []);

    return <ManagerAutocomplete value={managerId} onChange={handleChange} />;
}

export default ManagerSelect;
