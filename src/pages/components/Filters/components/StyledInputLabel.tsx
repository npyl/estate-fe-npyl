import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInputLabel = styled(InputLabel)(({theme}) => ({
    textAlign:"center",...(theme.palette.mode === "dark" && {
        top: "-0.5rem"
      }),
}))

export default StyledInputLabel;