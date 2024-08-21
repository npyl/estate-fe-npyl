import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps & {
    name: string;
    adornment?: string;
    initialValue?: string | number; // Allow passing initial value via props
};

const formatNumber = (value: string) => {
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
    initialValue = "", // Default empty string if no initial value provided
    ...other
}) => {
    const { control, setValue } = useFormContext();
    const [displayValue, setDisplayValue] = useState<string>(
        initialValue ? String(initialValue) : ""
    );

    useEffect(() => {
        if (initialValue) {
            setDisplayValue(formatNumber(String(initialValue)));
        }
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d]/g, ""); // Only allow numbers
        const formattedValue = formatNumber(inputValue);
        setDisplayValue(formattedValue);
        setValue(
            name,
            inputValue
                ? parseFloat(inputValue.replace(/\./g, "").replace(",", "."))
                : 0
        );
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValue} // Use defaultValue from props
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
