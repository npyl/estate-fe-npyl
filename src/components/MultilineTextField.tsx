import { styled } from "@mui/material/styles";
import TextField, {
    TextFieldProps,
    TextFieldVariants,
} from "@mui/material/TextField";

type MultilineTextFieldProps<V extends TextFieldVariants = TextFieldVariants> =
    Omit<TextFieldProps<V>, "multiline">;

const MultilineTextField = styled((props: MultilineTextFieldProps) => (
    <TextField multiline {...props} />
))(({ theme }) => ({
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
