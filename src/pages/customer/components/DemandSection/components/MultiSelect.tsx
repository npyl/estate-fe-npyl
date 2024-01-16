import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import { useCallback } from "react";
import { KeyValue } from "src/types/KeyValue";
import { useFormContext } from "react-hook-form";
import { RHFSelect } from "src/components/hook-form";

interface MultiSelectProps {
    name: string;
    label: string;
    options: KeyValue[];
}

const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
    const { watch, setValue } = useFormContext();

    const values = (watch(name) as string[]) || [];

    const renderValue = useCallback(
        (selected: string[]) =>
            selected
                .map((key) => options.find((item) => item.key === key)?.value)
                .filter(Boolean)
                .join(", "),
        [options]
    );

    const handleChange = useCallback(
        (e: SelectChangeEvent<string[]>) => setValue(name, e.target.value),
        [name]
    );

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <RHFSelect
                multiple
                fullWidth
                name={name}
                input={<OutlinedInput />}
                onChange={handleChange}
                renderValue={renderValue}
                value={values}
            >
                {options.map(({ key, value }, i) => (
                    <MenuItem key={i} value={key}>
                        <Checkbox checked={values?.indexOf(key) > -1} />
                        {value}
                    </MenuItem>
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default MultiSelect;
