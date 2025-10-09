import { styled } from "@mui/material";
import BaseView from "../BaseCalendar/View";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import { MISC_CELL_CLASSNAME } from "../Calendar/Views/MiscCell";

const CalendarGoogleView = styled(BaseView)({
    [`&:has(.${MISC_CELL_CLASSNAME}) .PPCalendar-Numbering`]: {
        marginTop: CELL_HOUR_HEIGHT,
    },

    [`&:has(.${MISC_CELL_CLASSNAME}) .PPCalendar-VerticalDivider`]: {
        marginTop: CELL_HOUR_HEIGHT,
    },
});

export default CalendarGoogleView;
