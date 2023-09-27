import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: number | string;
    formatThousands?: boolean; // e.g. 1.000, 1.000.000, ...
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const formatNumberWithPeriod = (num: string | number) =>
    num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
    formatThousands = false,
    onChange,
    adornment = "",
    disabled = false,
    ...props
}) => {
    const [displayValue, setDisplayValue] = useState<string | number>(
        value || ""
    );

    const debouncedOnChange = useDebouncedCallback(
        (value: string) => onChange(value),
        50
    );

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, "");

        debouncedOnChange(numericValue);

        const formattedValue = formatThousands
            ? formatNumberWithPeriod(numericValue)
            : numericValue;

        setDisplayValue(formattedValue);
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
