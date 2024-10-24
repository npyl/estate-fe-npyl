import { Stack, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Month";
import { TODAY } from "@/components/BaseCalendar/constants";
import HighlightTypography from "../../HighlightTypography";

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

interface CurrentMonthProps {
    date: Date;
}

const CurrentMonth: FC<CurrentMonthProps> = ({ date }) => {
    const isCurrentMonth = date.getMonth() === TODAY.getMonth();

    return (
        <HighlightTypography
            highlight={isCurrentMonth}
            textAlign="center"
            variant="h6"
            px={1.5}
            py={0.5}
            m={0.3}
            borderRadius="5px"
        >
            {date.toLocaleString("default", {
                month: "long",
            })}
        </HighlightTypography>
    );
};

export const CalendarYearViewCell: FC<CalendarCellProps> = ({
    date,
    events,
    onEventClick,
    ...props
}) => (
    <Stack sx={CellSx} {...props}>
        <CurrentMonth date={date} />
        <Stack height="200px" position="relative">
            {events.map(getEvent(onEventClick))}
        </Stack>
    </Stack>
);

export default CalendarYearViewCell;
