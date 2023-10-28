import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInputLabel = styled(InputLabel)(({theme}) => ({
    textAlign:"center",
    transform: theme.palette.mode === "dark" ? "translate(14px, 8px)" : "translate(14px, 16px)"
}))

export default StyledInputLabel;