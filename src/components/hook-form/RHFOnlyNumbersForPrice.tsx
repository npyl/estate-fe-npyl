import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps & {
    name: string;
    adornment?: string;
};

const formatNumber = (value: string) => {
    // Convert the string to a number and format with thousands separator
    const numberValue = value.replace(/\./g, "").replace(",", ".");
    const formattedValue = new Intl.NumberFormat("de-DE").format(
        parseFloat(numberValue)
    );
    return formattedValue;
};

const RHFOnlyNumbersForPrice: React.FC<Props> = ({
    name,
    label,
    disabled = false,
    adornment = "",
    ...other
}) => {
    const { control, setValue } = useFormContext();
    const [displayValue, setDisplayValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d]/g, ""); // Only allow numbers
        const formattedValue = formatNumber(inputValue);
        setDisplayValue(formattedValue);
        setValue(
            name,
            inputValue
                ? parseFloat(inputValue.replace(/\./g, "").replace(",", ".")) //use '.' instead of ','
                : 0
        ); // Update form value
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...other}
                    label={label}
                    value={displayValue}
                    onChange={handleChange}
                    disabled={disabled}
                    error={Boolean(error)}
                    helperText={error ? error.message : null}
                    InputProps={{
                        endAdornment: adornment ? (
                            <InputAdornment position="end">
                                {adornment}
                            </InputAdornment>
                        ) : null,
                    }}
                />
            )}
        />
    );
};

export default RHFOnlyNumbersForPrice;
