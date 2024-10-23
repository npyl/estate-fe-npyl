import { FC } from "react";
import { Stack, SxProps, Theme } from "@mui/material";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import MonthCalendarEvent from "../../Event/Month";
import HighlightTypography from "../../HighlightTypography";
import { TODAY } from "@/components/BaseCalendar/constants";

// ------------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (e: TCalendarEvent) =>
        <MonthCalendarEvent key={e.id} event={e} onClick={onClick} />;

// ------------------------------------------------------------------

const CellSx: SxProps<Theme> = {
    "&:nth-of-type(7n)": {
        borderRight: "1px solid",
        borderColor: "divider",
    },
};

// ------------------------------------------------------------------

const CalendarMonthViewCell: FC<CalendarCellProps> = ({
    date,
    events,
    onEventClick,
}) => {
    const isToday = TODAY.toDateString() === date.toDateString();

    return (
        <Stack
            height="300px"
            position="relative"
            border="1px solid"
            borderColor="divider"
            borderTop="none"
            borderRight="none"
            sx={CellSx}
        >
            <HighlightTypography
                highlight={isToday}
                textAlign="center"
                borderRadius="5px"
                m={0.3}
            >
                {date.getDate()}
            </HighlightTypography>

            {events.map(getEvent(onEventClick))}
        </Stack>
    );
};

export default CalendarMonthViewCell;
