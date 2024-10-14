import {
    BaseCalendarCellProps,
    BaseCalendarYearViewProps,
} from "@/components/BaseCalendar/types";
import YearView from "@/components/BaseCalendar/View/Year";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

// ------------------------------------------------------------

const Cell: FC<BaseCalendarCellProps> = ({ date }) => (
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

const Year: FC<BaseCalendarYearViewProps> = ({ date }) => (
    <YearView date={date} Cell={Cell} />
);

export default Year;
