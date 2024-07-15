import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
}));

export default StyledIconButton;
