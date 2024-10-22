import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Month";

const CellSx: SxProps<Theme> = {
    position: "relative",
    borderRight: "1px solid",
    borderBottom: "1px solid",
    borderColor: (theme) => theme.palette.divider,

    "&:nth-of-type(4n+1)": {
        borderLeft: "1px solid",
        borderColor: (theme) => theme.palette.divider,
    },
    "&:nth-of-type(-n+4)": {
        borderTop: "1px solid",
        borderColor: (theme) => theme.palette.divider,
    },
};

// ------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (e: TCalendarEvent) =>
        <CompactCalendarEvent key={e.id} event={e} onClick={onClick} />;

// ------------------------------------------------------------

export const CalendarYearViewCell: FC<CalendarCellProps> = ({
    date,
    events,
    onEventClick,
}) => (
    <Stack sx={CellSx}>
        <Typography textAlign="center" variant="h6" color="text.secondary">
            {date.toLocaleString("default", {
                month: "long",
            })}
        </Typography>
        <Stack height="200px" position="relative">
            {events.map(getEvent(onEventClick))}
        </Stack>
    </Stack>
);

export default CalendarYearViewCell;
