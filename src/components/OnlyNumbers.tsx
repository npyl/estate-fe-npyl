import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: number | string;
    acceptsDecimal?: boolean;
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const formatNumberWithPeriod = (num: string | number) => {
    if (!num) return "";

    let strNum = num.toString();

    // Check if there is a decimal part
    let hasDecimal = strNum.includes(",");

    // Replace any existing periods before splitting
    strNum = strNum.replace(/\./g, "");

    let [integerPart, decimalPart] = strNum.split(",");

    // Apply the thousand separator regex only to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Rejoin the integer and decimal parts, if there was a decimal part originally
    return hasDecimal ? `${integerPart},${decimalPart || ""}` : integerPart;
};

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
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

        // Replace period with comma for decimal
        if (
            acceptsDecimal &&
            numericValue.charAt(numericValue.length - 1) === "."
        )
            numericValue = `${numericValue.slice(0, numericValue.length - 1)},`;

        // Format thousands
        const formattedValue = formatNumberWithPeriod(numericValue);

        debouncedOnChange(formattedValue);
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
