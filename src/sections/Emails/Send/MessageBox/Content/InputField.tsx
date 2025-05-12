import MultilineTextField from "@/components/MultilineTextField";
import { SxProps, TextFieldProps, Theme } from "@mui/material";
import { forwardRef } from "react";

const InputFieldSx: SxProps<Theme> = {
    width: 1,
    px: 1,
};

const InputField = forwardRef<
    HTMLInputElement,
    Omit<TextFieldProps, "variant">
>(({ sx, ...props }, ref) => (
    <MultilineTextField
        ref={ref}
        multiline
        variant="standard"
        sx={{ ...InputFieldSx, ...sx }}
        {...props}
    />
));

InputField.displayName = "InputField";

export default InputField;
