import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { KeyValue } from "src/types/KeyValue";
import { useFormContext } from "react-hook-form";
import { RHFSelect } from "src/components/hook-form";

// InputLabel that works well with a big label content
const BigInputLabel = styled(InputLabel)(({ theme }) => ({
    // Styles applied when the label is shrunk
    "&.MuiInputLabel-shrink": {
        backgroundColor: "white",
        paddingLeft: theme.spacing(0.8),
        paddingRight: theme.spacing(0.8),
    },
}));

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
            <BigInputLabel>{label}</BigInputLabel>
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
