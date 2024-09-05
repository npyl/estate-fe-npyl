import React, { ChangeEvent } from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

const beToVisible = (input: string): string => input.replace(".", ",");

const visibleToBe = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange?: (s: string) => void
) => {
    const inputValue = e.target.value;
    // Remove all dots (thousand separators)
    const withoutDots = inputValue.replace(/\./g, "");
    // Replace comma with dot (if exists)
    const standardDecimal = withoutDots.replace(",", ".");

    onChange?.(standardDecimal);
};

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "value" | "onChange"> {
    value: string;
    onChange: (s: string) => void;
    acceptsDecimal?: boolean;
    adornment?: string;
}

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    adornment = "",
    acceptsDecimal = false,
    value,
    onChange,
    ...other
}) => (
    <TextField
        value={beToVisible(value)}
        onChange={(e) => visibleToBe(e, onChange)}
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

export default OnlyNumbersInput;
