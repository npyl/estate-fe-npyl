import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { FC } from "react";

const InputFieldSx: SxProps<Theme> = {
    width: 1,
    px: 1,
};

const InputField: FC<Omit<TextFieldProps, "variant">> = ({ sx, ...props }) => (
    <TextField variant="standard" sx={{ ...InputFieldSx, ...sx }} {...props} />
);

export default InputField;
