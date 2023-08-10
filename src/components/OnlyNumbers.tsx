import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
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
    useEffect(() => {
        setLocalValue(value || "");
    }, [value]);

    const debouncedOnChange = useDebouncedCallback(
        (value: string) => onChange(value),
        50
    );

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, "");

        setLocalValue(numericValue); // set local value immediately
        debouncedOnChange(numericValue); // set store with debounce
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
