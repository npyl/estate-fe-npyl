import { SetterType } from "./types";

const useOption = (filterKey: string, values: string[], setter: SetterType) => {
    const isChecked = values.includes(filterKey);

    const handleToggle = () => {
        // toggle
        const newValues = values.includes(filterKey)
            ? values.filter((s) => s !== filterKey)
            : [...values, filterKey];

        // update slice
        setter(newValues);
    };

    return { isChecked, handleToggle };
};

export default useOption;
