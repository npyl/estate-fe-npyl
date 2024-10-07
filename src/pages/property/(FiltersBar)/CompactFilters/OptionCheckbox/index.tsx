import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useOption from "./useOption";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { FC } from "react";
import { SelectorType, SetterType, TOptionMapper } from "./types";

interface OptionCheckboxProps {
    optionKey: string;
    label: string;

    selector: SelectorType;
    setter: SetterType;

    mapper: TOptionMapper;
}

const OptionCheckbox: FC<OptionCheckboxProps> = ({
    optionKey,
    label,

    selector,
    setter,

    mapper,
}) => {
    const { isChecked, handleToggle } = useOption(optionKey, selector, setter);
    const { counters } = useFilterCounters();
    const isDisabled = mapper(optionKey, counters) === 0;

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
