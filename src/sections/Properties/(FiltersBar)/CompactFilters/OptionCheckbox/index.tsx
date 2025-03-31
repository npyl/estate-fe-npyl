import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useOption from "./useOption";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { FC } from "react";
import { SetterType, TOptionMapper } from "./types";

interface OptionCheckboxProps {
    optionKey: string;
    label: string;

    values: string[];
    setter: SetterType;

    mapper: TOptionMapper;
}

const OptionCheckbox: FC<OptionCheckboxProps> = ({
    optionKey,
    label,

    values,
    setter,

    mapper,
}) => {
    const { isChecked, handleToggle } = useOption(optionKey, values, setter);
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
