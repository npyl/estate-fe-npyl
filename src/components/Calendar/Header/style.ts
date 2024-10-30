import BaseHeader from "@/components/BaseCalendar/Header";
import { styled } from "@mui/material/styles";
import { Z_INDEX } from "@/constants/calendar";

const StyledBaseHeader = styled(BaseHeader)(({ theme }) => ({
    position: "relative",
    padding: theme.spacing(1),
    zIndex: Z_INDEX.HEADER,
    boxShadow: `0 4px 6px -1px ${theme.palette.action.hover}`, // Added box shadow
}));

export default StyledBaseHeader;
