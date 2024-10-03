import { InputAdornment, TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";

const BEtoVisible = (v: string | number): string => {
    if (!v) return "";

    const s = typeof v === "number" ? v.toString() : v;
    if (!s) return "";

    const [integer, decimal] = s.split(".");

    const num = parseFloat(integer);
    if (isNaN(num)) return "";

    const thousands = num.toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
    });

    // INFO: we don't have a dot; this means that we don't have a decimal part (or even a start-of decimal part)
    if (!s.includes(".")) return thousands;

    return [thousands, decimal].join(",");
};

const visibleToBE = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (s: string) => void,
    acceptsDecimal: boolean
) => {
    // Remove all dots
    let value = e.target.value.replace(/\./g, "");

    // Accept only numbers
    if (!/^[0-9,]*$/.test(value)) {
        // If it contains other characters, don't update the value
        return;
    }

    // Ιf decimals are accepted accept ','
    if (acceptsDecimal) {
        const parts = value.split(",");
        if (parts[1] === "") value = `${parts[0]}.`;
        else {
            value = parts.join(".");
        }
    }
    // Otherwise, remove all commas
    else {
        value = value.replace(/,/g, "");
    }

    onChange?.(value);
};

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps<"standard">, "value" | "onChange"> {
    acceptsDecimal?: boolean;
    adornment?: string;
    value: string;
    onChange: (s: string) => void;
}

const OnlyNumbersInput = forwardRef<HTMLDivElement, OnlyNumbersInputProps>(
    (
        { adornment = "", acceptsDecimal = false, value, onChange, ...other },
        ref
    ) => (
        <TextField
            ref={ref}
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
    )
);

export default React.memo(OnlyNumbersInput);
