import { CSSProperties, FC } from "react";
import {
    BaseCalendarCellProps,
    BaseCalendarWeekViewProps,
} from "@/components/BaseCalendar/types";
import WeekView from "@/components/BaseCalendar/View/Week";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import Rows from "./Rows";

// ----------------------------------------------------------------------

const Cell: FC<BaseCalendarCellProps> = ({ date }) => (
    <Stack
        bgcolor={(theme) =>
            theme.palette.mode === "light" ? "grey.100" : "neutral.800"
        }
        width={1}
    >
        <Typography
            textAlign="center"
            variant="h6"
            bgcolor="background.paper"
            width={1}
        >
            {WEEKDAYS[date.getDay()]}
        </Typography>
    </Stack>
);

const CalendarWeekView: FC<BaseCalendarWeekViewProps> = ({ date }) => (
    <WeekView date={date} Cell={Cell} Numbering={Rows} />
);

export default CalendarWeekView;
