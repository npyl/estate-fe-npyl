import { useDispatch, useSelector } from "react-redux";
import { SelectorType, SetterType } from "./types";

const useOption = (
    filterKey: string,
    selector: SelectorType,
    setter: SetterType
) => {
    const dispatch = useDispatch();

    const values = useSelector(selector) || [];
    const isChecked = values.includes(filterKey);

    const handleToggle = () => {
        // toggle
        const newValues = values.includes(filterKey)
            ? values.filter((s) => s !== filterKey)
            : [...values, filterKey];

        // update slice
        dispatch(setter(newValues));
    };

    return { isChecked, handleToggle };
};

export default useOption;
