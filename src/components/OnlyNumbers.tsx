import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: number | string;
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
    onChange,
    adornment = "",
    disabled = false,
    ...props
}) => {
    const [localValue, setLocalValue] = useState<string | number>(value || "");

    const debouncedOnChange = useDebouncedCallback((value: string) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        onChange(numericValue);
    }, 50);

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setLocalValue(input); // set local value immediately
        debouncedOnChange(input);
    };

    return (
        <TextField
            fullWidth
            label={label}
            value={localValue}
            onChange={handleCodeChange}
            {...props}
            disabled={disabled}
            InputProps={{
                endAdornment: adornment ? (
                    <InputAdornment position="end">{adornment}</InputAdornment>
                ) : (
                    <></>
                ),
            }}
        />
    );
};

export default OnlyNumbersInput;
