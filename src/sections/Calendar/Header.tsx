import { styled } from "@mui/material";
import CalendarHeader from "@/components/Calendar/Header";
import { HEADER_HEIGHT, Z_INDEX } from "@/constants/calendar";
import { BaseCalendarHeaderProps } from "@/components/BaseCalendar/types";

const StyledHeader = styled(CalendarHeader)<BaseCalendarHeaderProps>(
    ({ theme, view }) => ({
        // position: "sticky",
        paddingTop: "10px",
        paddingBottom: "10px",
        // top: `${HEADER_HEIGHT}px`,
        zIndex: Z_INDEX.HEADER,
        backgroundColor: theme.palette.background.default,
        // ...
        marginBottom: view === "week" ? 0 : theme.spacing(2),
    })
);

export default StyledHeader;
