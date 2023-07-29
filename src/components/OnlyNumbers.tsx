import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

export interface OnlyNumbersInputProps
    extends Omit<TextFieldProps, "label" | "value" | "onChange" | "disabled"> {
    label: string;
    value?: number | string;
    onChange: (value: string) => void;
    adornment?: string;
    disabled?: boolean;
}

const OnlyNumbersInput: React.FC<OnlyNumbersInputProps> = ({
    label,
    value,
    onChange,
    adornment = "",
    disabled = false,
    ...props
}) => {
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, "");
        onChange(numericValue);
    };

    return (
        <TextField
            fullWidth
            label={label}
            value={value}
            onChange={handleCodeChange}
            {...props}
            disabled={disabled}
            InputProps={{
                endAdornment: adornment ? (
                    <InputAdornment position="end">{adornment}</InputAdornment>
                ) : (
                    <></>
                ),
            }}
        />
    );
};

export default OnlyNumbersInput;
