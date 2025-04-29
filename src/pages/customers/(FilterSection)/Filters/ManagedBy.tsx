import { useDispatch } from "src/store";
import { useSelector } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/customer/filters";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { useCallback } from "react";
import { useRouter } from "next/router";

function FilterManager() {
    const dispatch = useDispatch();
    const router = useRouter();

    const managerId = useSelector(selectManagerId);

    const handleChange = useCallback(
        (id: number) => {
            dispatch(setManagerId(id));

            // Clean managerId from URL if existts
            const newQuery = { ...router.query };
            if (newQuery.managerId) {
                delete newQuery.managerId;

                router.replace(
                    { pathname: router.pathname, query: newQuery },
                    undefined,
                    { shallow: true }
                );
            }
        },
        [dispatch, router]
    );

    return <ManagerAutocomplete value={managerId} onChange={handleChange} />;
}

export default FilterManager;
