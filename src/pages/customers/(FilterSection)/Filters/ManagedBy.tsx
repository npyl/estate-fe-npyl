import { useDispatch } from "src/store";
import { useSelector } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/customer/filters";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { useCallback } from "react";

function FilterManager() {
    const dispatch = useDispatch();

    const managerId = useSelector(selectManagerId);

    const handleChange = useCallback((id: number) => {
        dispatch(setManagerId(id));
    }, []);

    return <ManagerAutocomplete value={managerId} onChange={handleChange} />;
}

export default FilterManager;
