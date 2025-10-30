import { styled } from "@mui/material/styles";
import TextField, {
    TextFieldProps,
    TextFieldVariants,
} from "@mui/material/TextField";
import { forwardRef } from "react";

type MultilineTextFieldProps<V extends TextFieldVariants = TextFieldVariants> =
    Omit<TextFieldProps<V>, "multiline">;

const MultilineTextField = styled(
    forwardRef<HTMLDivElement, MultilineTextFieldProps>((props, ref) => (
        <TextField multiline ref={ref} {...props} />
    ))
)(({ theme }) => ({
    "& .MuiInputBase-root": {
        height: "auto!important",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: theme.spacing(1),
        paddingLeft: "13px",
        paddingRight: "13px",
    },
}));

export default MultilineTextField;
