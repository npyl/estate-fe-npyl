import { Checkbox, FormControl, InputLabel, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { KeyValue } from "src/types/KeyValue";
import { useWatch } from "react-hook-form";
import RHFSelect from "@/components/hook-form/dynamic/RHFSelect";

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
        <FormControl fullWidth variant="outlined">
            <BigInputLabel>{label}</BigInputLabel>
            <RHFSelect
                multiple
                fullWidth
                name={name}
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
        </FormControl>
    );
};

export default MultiSelect;
