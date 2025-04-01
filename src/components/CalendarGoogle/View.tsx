import { styled } from "@mui/material";
import BaseView from "../BaseCalendar/View";
import { DAY_CELL_HEIGHT } from "@/constants/calendar";

const CalendarView = styled(BaseView)({
    "&:has(.PPCalendar-MiscCell) .PPCalendar-Numbering": {
        marginTop: DAY_CELL_HEIGHT,
    },

    "&:has(.PPCalendar-MiscCell) .PPCalendar-VerticalDivider": {
        marginTop: DAY_CELL_HEIGHT,
    },
});

export default CalendarView;
