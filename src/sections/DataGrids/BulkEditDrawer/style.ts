import {
    Button,
    ButtonProps,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import OnlyNumbersInput from "src/components/OnlyNumbers";

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    fontWeight: 400,
    color: theme.palette.neutral?.[500],
    fontSize: "16px",
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
        border: `1px solid ${theme.palette.common.black}`,
        background: theme.palette.common.white,
    },
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // space out the text and the endIcon
}));

export const StyledTextField = styled(TextField)({
    "& .MuiInputBase-root": {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export const StyledOnlyNumbersInput = styled(OnlyNumbersInput)({
    "& .MuiInputBase-root": {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export const StyledOutlinedInput = styled(OutlinedInput)({
    "& .MuiOutlinedInput-notchedOutline": {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export const StyledSelect = styled(Select)({
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
});
