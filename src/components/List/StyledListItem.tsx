import { styled } from "@mui/material/styles";
import { ListItem as MuiListItem } from "@mui/material";

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
    flex: 1,
    "&:nth-of-type(odd)": {
        background:
            theme.palette.mode === "dark"
                ? "transparent"
                : theme.palette.background.paper,
    },
    "&:nth-of-type(even)": {
        background:
            theme.palette.mode === "dark"
                ? theme.palette.background.default
                : theme.palette.grey[50],
    },
}));

export default StyledListItem;
