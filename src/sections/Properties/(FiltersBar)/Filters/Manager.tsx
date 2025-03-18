import { useDispatch } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/filters";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";

function ManagerSelect() {
    const dispatch = useDispatch();

    const managerId = useSelector(selectManagerId);

    const handleChange = useCallback((id: number) => {
        if (!id) {
            dispatch(setManagerId(undefined));
            return;
        }

        dispatch(setManagerId(id));
    }, []);

    return <ManagerAutocomplete value={managerId} onChange={handleChange} />;
}

export default ManagerSelect;
