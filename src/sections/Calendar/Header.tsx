import { styled } from "@mui/material";
import CalendarHeader from "@/components/Calendar/Header";
import { HEADER_HEIGHT } from "@/components/Calendar/constant";

const StyledHeader = styled(CalendarHeader)(({ theme }) => ({
    position: "sticky",
    paddingTop: "10px",
    paddingBottom: "10px",
    top: `${HEADER_HEIGHT}px`,
    zIndex: 4,
    backgroundColor: theme.palette.background.default,
}));

export default StyledHeader;
