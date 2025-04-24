import { styled } from "@mui/material";
import BaseView from "../BaseCalendar/View";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";

const CalendarGoogleView = styled(BaseView)({
    "&:has(.PPCalendar-MiscCell) .PPCalendar-Numbering": {
        marginTop: CELL_HOUR_HEIGHT,
    },

    "&:has(.PPCalendar-MiscCell) .PPCalendar-VerticalDivider": {
        marginTop: CELL_HOUR_HEIGHT,
    },
});

export default CalendarGoogleView;
