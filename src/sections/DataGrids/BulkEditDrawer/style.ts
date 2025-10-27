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
    fontWeight: 400,
    color: theme.palette.neutral?.[500],
    fontSize: "16px",
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
        border: `1px solid ${theme.palette.action.active}`,
        backgroundColor: theme.palette.background.paper,
    },
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // space out the text and the endIcon
}));
