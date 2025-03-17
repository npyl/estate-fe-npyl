import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUsers, setUsers } from "src/slices/log";
import { useDispatch } from "src/store";

function FilterLogManager() {
    const dispatch = useDispatch();

    const ids = useSelector(selectUsers);
    const value = Array.isArray(ids) ? ids.at(0) : -1;

    const handleChange = useCallback((id: number) => {
        dispatch(setUsers([id]));
    }, []);

    return <ManagerAutocomplete value={value} onChange={handleChange} />;
}

export default FilterLogManager;
