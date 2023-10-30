import { styled } from "@mui/material/styles";
import { ListItem as MuiListItem } from "@mui/material";

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
 flex: 1,
  "&:nth-of-type(odd)": {
    background: theme.palette.background
  },
  "&:nth-of-type(even)": {
    background: theme.palette.divider
  },
}));

export default StyledListItem;
