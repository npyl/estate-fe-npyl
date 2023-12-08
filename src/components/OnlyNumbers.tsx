import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { useDebouncedCallback } from "use-debounce";

interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: number;
    acceptsDecimal?: boolean;
    onChange: (value: number) => void;
    adornment?: string;
    disabled?: boolean;
}

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
    onChange,
    adornment = "",
    disabled = false,
    acceptsDecimal = false,
    ...props
}) => {
    const [localValue, setLocalValue] = useState("");

    useEffect(() => {
        setLocalValue(value?.toString() || "");
    }, [value]);

    const debouncedChange = useDebouncedCallback(
        (n: number) => onChange(n),
        50
    );

    const handleChange = (values: NumberFormatValues) => {
        debouncedChange(values.floatValue || 0);
        setLocalValue(values.formattedValue);
    };

    // TODO: make it show thousands and work with acceptDecimal true / false

    return (
        <NumericFormat
            fullWidth
            customInput={TextField}
            label={label}
            onValueChange={handleChange}
            value={localValue}
            variant="outlined"
            // thousandSeparator="."
            decimalSeparator=","
            allowedDecimalSeparators={[","]}
            // fixedDecimalScale={acceptsDecimal}
            // decimalScale={acceptsDecimal ? 2 : undefined}
            // {...props}
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
