import { FC } from "react";
import { Stack, SxProps, Theme } from "@mui/material";
import {
    CalendarCellProps,
    CalendarMouseEvent,
    TCalendarEvent,
} from "../../types";
import CompactCalendarEvent from "../../Event/Compact";
import HighlightTypography from "../../HighlightTypography";
import { TODAY } from "@/components/BaseCalendar/constants";

// ------------------------------------------------------------------

const getEvent =
    (onClick?: (e: CalendarMouseEvent) => void) => (e: TCalendarEvent) =>
        <CompactCalendarEvent key={e.id} event={e} onClick={onClick} />;

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
    ...props
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
            {...props}
        >
            <HighlightTypography
                highlight={isToday}
                shape="horizontal"
                borderRadius="5px"
                m={0.3}
            >
                {date.getDate()}
            </HighlightTypography>

            <Stack overflow="hidden auto" spacing={1}>
                {events.map(getEvent(onEventClick))}
            </Stack>
        </Stack>
    );
};

export default CalendarMonthViewCell;
