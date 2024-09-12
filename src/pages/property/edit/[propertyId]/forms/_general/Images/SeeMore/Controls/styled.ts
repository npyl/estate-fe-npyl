import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import SoftButton from "@/components/SoftButton";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
}));

const ResponsiveSoftButton = styled(SoftButton)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        fontSize: 0,
        "& .MuiButton-icon": {
            marginRight: 0,
        },
    },
}));

export { ResponsiveSoftButton };
export default StyledIconButton;
