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
    const [displayValue, setDisplayValue] = useState<string | number>(
        value || ""
    );

    useEffect(() => {
        setLocalValue(value || "");
        if (value !== null && value !== undefined) {
            setDisplayValue(formatNumberWithPeriod(value));
        } else {
            setDisplayValue("");
        }
    }, [value]);

    const debouncedOnChange = useDebouncedCallback(
        (value: string) => onChange(value),
        50
    );

    const formatNumberWithPeriod = (num: string | number) => {
        if (num === null || num === undefined) {
            return "";
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, "");

        setLocalValue(numericValue); // set local value immediately
        debouncedOnChange(numericValue); // set store with debounce

        const formattedValue = formatNumberWithPeriod(numericValue);
        setDisplayValue(formattedValue); // set display value
    };

    return (
        <TextField
            fullWidth
            label={label}
            value={displayValue}
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
