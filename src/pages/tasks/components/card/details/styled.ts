// @mui
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledLabel = styled("span")(({ theme }) => ({
    ...theme.typography.caption,
    width: 60,
    flexShrink: 0,
    color: theme.palette.text.secondary,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": { height: "100%!important" },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: theme.spacing(1),
    },
}));
