import { InputAdornment, TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

const BEtoVisible = (s: string): string => {
    if (!s) return "";
    const num = parseFloat(s);
    if (isNaN(num)) return "";
    return num.toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
    });
};

const visibleToBE = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (s: string) => void,
    acceptsDecimal: boolean
) => {
    let value = e.target.value.replace(/\./g, "");

    if (acceptsDecimal) {
        // Replace the first comma with a dot, keep subsequent commas
        const parts = value.split(",");
        if (parts.length > 1) {
            value = parts[0] + "." + parts.slice(1).join("");
        }
    } else {
        // Remove all commas if decimals are not accepted
        value = value.replace(/,/g, "");
    }

    const num = parseFloat(value);
    if (!isNaN(num)) {
        onChange?.(num.toString());
    } else if (value === "" || value === "-") {
        onChange?.(value);
    }
};

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps<"standard">, "value" | "onChange"> {
    acceptsDecimal?: boolean;
    adornment?: string;
    value: string;
    onChange: (s: string) => void;
}

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    adornment = "",
    acceptsDecimal = false,
    value,
    onChange,
    ...other
}) => {
    return (
        <TextField
            value={BEtoVisible(value)}
            onChange={(e) => visibleToBE(e, onChange, acceptsDecimal)}
            {...other}
            InputProps={{
                ...other.InputProps,
                // Adornment
                endAdornment: adornment ? (
                    <InputAdornment position="end">{adornment}</InputAdornment>
                ) : null,
            }}
        />
    );
};

export default React.memo(OnlyNumbersInput);
