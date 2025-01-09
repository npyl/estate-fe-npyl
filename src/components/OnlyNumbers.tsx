import { InputAdornment, TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { ChangeEvent, forwardRef, useCallback } from "react";

const BEtoVisible_withThousands = (v: string | number): string => {
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

const visibleToBE_withThousands = (
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

const BEtoVisible = (v: string | number): string => {
    if (!v) return "";

    const s = typeof v === "number" ? v.toString() : v;
    if (!s) return "";

    return s;
};

const visibleToBE = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (s: string) => void,
    acceptsDecimal: boolean
) => {
    let value = e.target.value;

    // Accept only numbers and one decimal separator
    if (!/^[0-9.,]*$/.test(value)) {
        return;
    }

    if (acceptsDecimal) {
        // Replace comma with dot if present
        value = value.replace(",", ".");

        // Ensure only one decimal separator
        const parts = value.split(".");
        if (parts.length > 2) {
            value = `${parts[0]}.${parts.slice(1).join("")}`;
        }
    } else {
        // Remove all decimal separators if decimals are not accepted
        value = value.replace(/[.,]/g, "");
    }

    onChange?.(value);
};

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps<"standard">, "value" | "onChange"> {
    acceptsDecimal?: boolean;
    separateThousands?: boolean;
    adornment?: string;
    value: string;
    onChange: (s: string) => void;
}

const OnlyNumbersInput = forwardRef<HTMLDivElement, OnlyNumbersInputProps>(
    (
        {
            adornment = "",
            acceptsDecimal = false,
            separateThousands = true,
            value: _value,
            onChange,
            ...other
        },
        ref
    ) => {
        const value = separateThousands
            ? BEtoVisible_withThousands(_value)
            : BEtoVisible(_value);

        const handleChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) =>
                separateThousands
                    ? visibleToBE_withThousands(e, onChange, acceptsDecimal)
                    : visibleToBE(e, onChange, acceptsDecimal),
            [separateThousands, acceptsDecimal, onChange]
        );

        return (
            <TextField
                ref={ref}
                value={value}
                onChange={handleChange}
                {...other}
                InputProps={{
                    ...other.InputProps,
                    endAdornment: adornment ? (
                        <InputAdornment position="end">
                            {adornment}
                        </InputAdornment>
                    ) : null,
                }}
            />
        );
    }
);

export default OnlyNumbersInput;
