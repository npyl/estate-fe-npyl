import { useCallback } from "react";
import ManagerAutocomplete from "@/ui/Autocompletes/Manager";
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
