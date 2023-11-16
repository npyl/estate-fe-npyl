import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: number | string;
    formatThousands?: boolean;
    acceptsDecimal?: boolean;
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
    acceptsDecimal = false,
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
        let input = event.target.value;

        // Allow only one decimal point
        let decimalRegex = acceptsDecimal
            ? /[^0-9.,]|[.,](?=.*[.,])/g
            : /[^0-9]/g;
        let numericValue = input.replace(decimalRegex, "");

        // Replace comma with period for decimal
        if (acceptsDecimal && numericValue.includes(",")) {
            numericValue = numericValue.replace(",", ".");
        }

        debouncedOnChange(numericValue);

        const formattedValue = formatThousands
            ? formatNumberWithPeriod(numericValue)
            : numericValue;

        setDisplayValue(formattedValue);
    };

    useEffect(() => {
        setDisplayValue(value || "");
    }, [value]);

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
                ) : null,
            }}
        />
    );
};

export default OnlyNumbersInput;
