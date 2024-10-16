import YearView from "@/components/BaseCalendar/View/Year";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { CalendarCellProps, CalendarYearViewProps } from "../types";

// ------------------------------------------------------------

const Cell: FC<CalendarCellProps> = ({ date }) => (
    <Stack>
        <Typography textAlign="center" variant="h6" color="text.secondary">
            {date.toLocaleString("default", {
                month: "long",
            })}
        </Typography>
        <Stack height="200px">...</Stack>
    </Stack>
);

// ------------------------------------------------------------

const Year: FC<CalendarYearViewProps> = ({ events = [], date }) => (
    <YearView
        date={date}
        Cell={(props) => <Cell {...props} events={events} />}
    />
);

export default Year;
