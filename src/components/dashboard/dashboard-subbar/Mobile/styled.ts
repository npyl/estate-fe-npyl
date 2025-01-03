import getBorderColor from "@/theme/borderColor";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor(theme),
    boxShadow: theme.shadows[18],
    "&:hover": {
        backgroundColor: theme.palette.background.paper,
    },

    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
}));

export { StyledMenuItem };
