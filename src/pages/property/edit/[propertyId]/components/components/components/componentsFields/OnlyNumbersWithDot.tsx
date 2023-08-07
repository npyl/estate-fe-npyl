import { TextField, InputAdornment } from "@mui/material";
import React from "react";

interface OnlyNumbersWithDotProps {
    label: string;
    value: string | number;
    adorValue?: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OnlyNumbersWithDot: React.FC<OnlyNumbersWithDotProps> = ({
    label,
    value,
    onChange,
    adorValue,
    ...props
}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // Only accept digits and one period
        const isValid = /^[0-9]*\.?[0-9]*$/.test(inputValue);
        if (isValid) {
            onChange(event);
        }
    };

    return (
        <TextField
            type="text"
            fullWidth
            label={label}
            value={value}
            onChange={handleInputChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">{adorValue}</InputAdornment>
                ),
            }}
            inputProps={{
                style: {
                    height: "8px",
                },
            }}
            {...props} // Spread the remaining props to allow additional customization
        />
    );
};

export default OnlyNumbersWithDot;
