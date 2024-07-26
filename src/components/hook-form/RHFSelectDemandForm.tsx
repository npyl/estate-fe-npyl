import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    InputAdornment,
    Typography,
} from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { FC, useEffect, useState } from "react";

type RHFSelectDemandFormProps = UseControllerProps & {
    label: string;
    adornment?: string;
    options: number[];
    allowClear?: boolean;
};

const RHFSelectDemandForm: FC<RHFSelectDemandFormProps> = ({
    label,
    adornment,
    options,
    allowClear = false,
    ...props
}) => {
    const { field } = useController(props);
    const [currentValue, setCurrentValue] = useState(field.value);

    const handleChange = (event: any) => {
        const value = event.target.value;
        field.onChange(value === "" ? null : value);
        setCurrentValue(value === "" ? null : value);
    };

    useEffect(() => {
        setCurrentValue(field.value);
    }, [field.value]);

    // Ensure the current value is included in the options if not already present
    const displayOptions = [...options];
    if (
        currentValue !== null &&
        currentValue !== undefined &&
        !displayOptions.includes(currentValue)
    ) {
        displayOptions.push(currentValue);
    }

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel
                shrink={currentValue !== null && currentValue !== undefined}
            >
                {label}
            </InputLabel>
            <Select
                {...field}
                label={label}
                value={currentValue}
                onChange={handleChange}
                renderValue={(selected) =>
                    selected
                        ? `${selected.toLocaleString("de-DE")}${
                              adornment ? ` ${adornment}` : ""
                          }`
                        : ""
                }
                displayEmpty={allowClear}
            >
                {allowClear && (
                    <MenuItem value="">
                        <Typography>Clear Value</Typography>
                    </MenuItem>
                )}
                {displayOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {adornment
                            ? `${option.toLocaleString("de-DE")} ${adornment}`
                            : `${option.toLocaleString("de-DE")}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RHFSelectDemandForm;
