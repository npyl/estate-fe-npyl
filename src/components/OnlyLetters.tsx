import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: string;
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const onlyLettersRegex = /^[a-zA-Zα-ωΑ-ΩάέήίόύώΆΈΉΊΌΎΏ-ϊϋ]*$/;

const isValid = (value: string) => value.match(onlyLettersRegex);

const OnlyLettersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
    onChange,
    adornment = "",
    disabled = false,
    ...props
}) => {
    const [displayValue, setDisplayValue] = useState<string>("");

    const debouncedOnChange = useDebouncedCallback(
        (value: string) => onChange(value),
        50
    );

    useEffect(() => {
        if (!value) return;
        if (isValid(value)) setDisplayValue(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;

        if (!isValid(input)) return;

        debouncedOnChange(input); // set store with debounce
        setDisplayValue(input);
    };

    return (
        <TextField
            fullWidth
            label={label}
            value={displayValue}
            onChange={handleChange}
            {...props}
            disabled={disabled}
        />
    );
};

export default OnlyLettersInput;
