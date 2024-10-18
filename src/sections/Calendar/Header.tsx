import { styled } from "@mui/material";
import CalendarHeader from "@/components/Calendar/Header";
import { HEADER_HEIGHT, Z_INDEX } from "@/components/Calendar/constant";

const StyledHeader = styled(CalendarHeader)(({ theme }) => ({
    position: "sticky",
    paddingTop: "10px",
    paddingBottom: "10px",
    top: `${HEADER_HEIGHT}px`,
    zIndex: Z_INDEX.HEADER,
    backgroundColor: theme.palette.background.default,
}));

export default StyledHeader;
