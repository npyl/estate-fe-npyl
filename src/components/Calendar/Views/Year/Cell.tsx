import { Stack, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import {
    CalendarCellProps,
    CalendarMouseEvent,
    TCalendarEvent,
} from "../../types";
import CompactCalendarEvent from "../../Event/Compact";
import { TODAY } from "@/components/BaseCalendar/constants";
import HighlightTypography from "../../HighlightTypography";
import useCalendarLocale from "../../useCalendarLocale";

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
    (onClick?: (e: CalendarMouseEvent) => void) => (e: TCalendarEvent) =>
        (
            <CompactCalendarEvent
                key={e.id}
                event={e}
                withDate
                onClick={onClick}
            />
        );

// ------------------------------------------------------------

interface CurrentMonthProps {
    date: Date;
}

const CurrentMonth: FC<CurrentMonthProps> = ({ date }) => {
    const isCurrentMonth = date.getMonth() === TODAY.getMonth();
    const locale = useCalendarLocale();
    const month = date.toLocaleString(locale, {
        month: "long",
    });

    return (
        <HighlightTypography
            highlight={isCurrentMonth}
            variant="h6"
            px={1.5}
            py={0.5}
            m={0.3}
            borderRadius="5px"
            shape="horizontal"
        >
            {month}
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
        <Stack
            height="200px"
            position="relative"
            overflow="hidden auto"
            spacing={1}
        >
            {events.map(getEvent(onEventClick))}
        </Stack>
    </Stack>
);

export default CalendarYearViewCell;
