// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { useCallback, useState } from "react";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
    name: string;
    acceptsDecimal?: boolean;
    adornment?: string;
};

export default function RHFOnlyNumbers({
    name,
    label,
    disabled = false,
    acceptsDecimal = false,
    adornment = "",
    ...other
}: Props) {
    const { control, setValue } = useFormContext();

    const [localValue, setLocalValue] = useState("");

    const handleChange = useCallback((values: NumberFormatValues) => {
        setValue(name, values.floatValue || 0);
        setLocalValue(values.formattedValue);
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <NumericFormat
                    fullWidth
                    customInput={TextField}
                    label={label}
                    // TODO: fix this:
                    // thousandSeparator={"."}
                    onValueChange={handleChange}
                    value={localValue}
                    decimalSeparator={acceptsDecimal ? "," : undefined}
                    allowedDecimalSeparators={
                        acceptsDecimal ? [","] : undefined
                    }
                    allowNegative={false}
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
}
