import ManagerAutocomplete from "@/ui/Autocompletes/Manager";
import { useFiltersContext, useManagerId } from "../Context";

function FilterManager() {
    const { setManagerId } = useFiltersContext();
    const managerId = useManagerId();
    return <ManagerAutocomplete value={managerId} onChange={setManagerId} />;
}

export default FilterManager;
