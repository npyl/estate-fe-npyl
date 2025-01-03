import { FC } from "react";
import Grid from "@mui/material/Grid";
import { BaseCalendarCellProps } from "@/components/BaseCalendar/types";
import MonthView from "@/components/BaseCalendar/View/Month";
import { SxProps, Theme, Typography } from "@mui/material";
import { CalendarMonthViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import useCalendarLocale from "../../useCalendarLocale";
const CalendarMonthViewCell = dynamic(() => import("./Cell"));

// --------------------------------------------------------------------------

const PlaceholderCell = () => (
    <Grid
        item
        xs={12 / 7}
        border="1px solid"
        borderColor="divider"
        borderTop="none"
        borderRight="none"
        sx={{
            backgroundColor: ({ palette: { mode } }) =>
                mode === "light" ? "neutral.200" : "neutral.800",
            "&:nth-of-type(7n)": {
                borderRight: "1px solid",
                borderColor: "divider",
            },
        }}
    />
);

// --------------------------------------------------------------------------

const HeadSx: SxProps<Theme> = {
    "&:nth-of-type(7n)": {
        borderRight: "1px solid",
        borderColor: "divider",
    },
};

const HeadCell: FC<BaseCalendarCellProps> = ({ date }) => {
    const locale = useCalendarLocale();
    const weekday = date.toLocaleDateString(locale, { weekday: "short" });
    return (
        <Typography
            textAlign="center"
            variant="h6"
            color="text.secondary"
            border="1px solid"
            borderColor="divider"
            borderBottom="none"
            borderRight="none"
            sx={HeadSx}
        >
            {weekday}
        </Typography>
    );
};

// --------------------------------------------------------------------------

const CalendarMonthView: FC<CalendarMonthViewProps> = ({
    events = [],
    Cell: PassedCell,
    date,
    // ...
    getCellEvents = _getTodaysEvents,
    onEventClick,
    // ...
    ...props
}) => {
    const Cell = PassedCell || CalendarMonthViewCell;

    return (
        <MonthView
            date={date}
            HeadCell={HeadCell}
            Cell={(props) => (
                <Cell
                    {...props}
                    events={getCellEvents(events, props.date)}
                    onEventClick={onEventClick}
                />
            )}
            PlaceholderCell={PlaceholderCell}
            {...props}
        />
    );
};

export default CalendarMonthView;
