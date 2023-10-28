import { styled } from "@mui/material/styles";
import { ListItem as MuiListItem } from "@mui/material";

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
 flex: 1,
  "&:nth-of-type(odd)": {
    background: theme.palette.mode === "dark" ? "transparent" : "white",
  },
  "&:nth-of-type(even)": {
    background: theme.palette.mode === "dark" ? "transparent" : "#fcfcfc",
  },
}));

export default StyledListItem;
