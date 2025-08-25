import { Checkbox, MenuItem } from "@mui/material";
import { useCallback } from "react";
import { KeyValue } from "src/types/KeyValue";
import { useWatch } from "react-hook-form";
import RHFSelect from "@/components/hook-form/dynamic/RHFSelect";

interface MultiSelectProps {
    name: string;
    label: string;
    options: KeyValue[];
}

const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
    const values = (useWatch({ name }) as string[]) || [];

    const renderValue = useCallback(
        (selected: string[]) =>
            selected
                .map((key) => options.find((item) => item.key === key)?.value)
                .filter(Boolean)
                .join(", "),
        [options]
    );

    return (
        <RHFSelect
            multiple
            fullWidth
            name={name}
            label={label}
            defaultValue={[]}
            renderValue={renderValue}
        >
            {options.map(({ key, value }, i) => (
                <MenuItem key={i} value={key}>
                    <Checkbox checked={values?.indexOf(key) > -1} />
                    {value}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

export default MultiSelect;
