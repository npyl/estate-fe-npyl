import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface OnlyEmailInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: string;
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const isEmail = (value: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value) || value === "";
};

const OnlyEmailInput: React.FC<OnlyEmailInputProps> = ({
    label,
    value,
    onChange,
    adornment = "",
    disabled = false,
    ...props
}) => {
    const [displayValue, setDisplayValue] = useState<string>("");
    const [emailError, setEmailError] = useState(false);
    const [helperText, setHelperText] = useState("");

    const debouncedOnChange = useDebouncedCallback(
        (value: string) => onChange(value),
        50
    );

    const debouncedValidationCheck = useDebouncedCallback(
        (inputValue: string) => {
            if (isEmail(inputValue)) {
                setEmailError(false);
                setHelperText("");
            } else {
                setEmailError(true);
                setHelperText("Please enter a valid email");
            }
        },
        200 // 200 delay for validation after user stops typing
    );

    useEffect(() => {
        if (!value) return;
        setDisplayValue(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;

        debouncedOnChange(input);
        setDisplayValue(input);
        debouncedValidationCheck(input);
    };

    return (
        <TextField
            fullWidth
            label={label}
            type="email"
            value={displayValue}
            onChange={handleChange}
            error={emailError}
            helperText={helperText}
            disabled={disabled}
            {...props}
        />
    );
};

export default OnlyEmailInput;
