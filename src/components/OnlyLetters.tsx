import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: string;
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const onlyLettersRegex = /^[a-zA-Zα-ωΑ-ΩάέήίόύώΆΈΉΊΌΎΏ]*$/;

const OnlyLettersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
    onChange,
    adornment = "",
    disabled = false,
    ...props
}) => {
    const [displayValue, setDisplayValue] = useState<string>(value || "");

    const debouncedOnChange = useDebouncedCallback(
        (value: string) => onChange(value),
        50
    );

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;

        if (input.match(onlyLettersRegex)) {
            debouncedOnChange(input); // set store with debounce
            setDisplayValue(input);
        }
    };

    return (
        <TextField
            fullWidth
            label={label}
            value={displayValue}
            onChange={handleCodeChange}
            {...props}
            disabled={disabled}
        />
    );
};

export default OnlyLettersInput;
