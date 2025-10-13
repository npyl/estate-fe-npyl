import { styled } from "@mui/material";
import BaseView from "../BaseCalendar/View";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import { MISC_CELL_CLASSNAME } from "../Calendar/Views/MiscCell";
import { PPCalendarNumberingCN } from "../Calendar/Views/Numbering";
import { PPCalendarVerticalDividerCN } from "../Calendar/Views/Week/Cell/VerticalDivider";

const CalendarGoogleView = styled(BaseView)({
    [`&:has(.${MISC_CELL_CLASSNAME}) .${PPCalendarNumberingCN}`]: {
        marginTop: CELL_HOUR_HEIGHT,
    },

    [`&:has(.${MISC_CELL_CLASSNAME}) .${PPCalendarVerticalDividerCN}`]: {
        marginTop: CELL_HOUR_HEIGHT,
    },
});

export default CalendarGoogleView;
