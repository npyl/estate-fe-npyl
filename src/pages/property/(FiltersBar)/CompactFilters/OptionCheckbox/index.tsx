import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useOption from "./useOption";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { IPropertyFilterCounters } from "@/types/properties";
import { FC } from "react";
import { SelectorType, SetterType } from "./types";

interface OptionCheckboxProps {
    filterKey: keyof IPropertyFilterCounters;
    label: string;

    selector: SelectorType;
    setter: SetterType;
}

const OptionCheckbox: FC<OptionCheckboxProps> = ({
    filterKey,
    label,
    selector,
    setter,
}) => {
    const { isChecked, handleToggle } = useOption(filterKey, selector, setter);
    const { counters } = useFilterCounters();
    const isDisabled = counters?.[filterKey] === 0;

    return (
        <FormControlLabel
            control={<Checkbox />}
            disabled={isDisabled}
            checked={isChecked}
            label={label}
            onChange={handleToggle}
        />
    );
};

export default OptionCheckbox;
