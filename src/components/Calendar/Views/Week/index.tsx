import { CSSProperties, FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import Numbering from "../Numbering";
import { Stack, styled, Typography } from "@mui/material";
import { MARGIN_TOP } from "./constant";
import { CalendarWeekViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import { getStartOfWeek } from "@/components/BaseCalendar/util";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
const CalendarWeekViewCell = dynamic(() => import("./Cell"));

// ----------------------------------------------------------------------

const StyledNumbering = styled(Numbering)({
    marginTop: MARGIN_TOP,
});

// -----------------------------------------------------------------------

interface DayTypographyProps {
    date: Date;
}

const DayTypography: FC<DayTypographyProps> = ({ date }) => {
    const day = date.toLocaleDateString("en-US", {
        day: "2-digit",
    });

    const isToday = date.toDateString() === new Date().toDateString();
    const bgColor = isToday ? "primary.main" : "transparent";
    const color = isToday ? "background.paper" : "text.secondary";

    return (
        <Typography
            textAlign="center"
            variant="h3"
            width="fit-content"
            borderRadius="100%"
            bgcolor={bgColor}
            color={color}
            px={1.5}
            py={0.5}
        >
            {day}
        </Typography>
    );
};

interface DayProps {
    date: Date;
}

const Day: FC<DayProps> = ({ date }) => (
    <Stack justifyContent="center" alignItems="center">
        <Typography
            textAlign="center"
            variant="h6"
            width={1}
            color="text.secondary"
        >
            {WEEKDAYS[date.getDay()]}
        </Typography>
        <Stack width={1} justifyContent="center" alignItems="center">
            <DayTypography date={date} />
        </Stack>
    </Stack>
);

const getDay = (date: Date) => <Day key={date.toISOString()} date={date} />;

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
};

interface DaysHeaderProps {
    date: Date;
}

const DaysHeader: FC<DaysHeaderProps> = ({ date }) => {
    const startOfWeek = getStartOfWeek(date);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    return (
        <Stack
            direction="row"
            bgcolor="background.default"
            width={1}
            top="63px"
            position="sticky"
            zIndex={4}
            py={1}
        >
            <Stack width="50px" height={1} />

            <div style={gridStyle}>{weekDays.map(getDay)}</div>
        </Stack>
    );
};

const CalendarWeekView: FC<CalendarWeekViewProps> = ({
    events = [],
    getCellEvents = _getTodaysEvents,
    Cell: PassedCell,
    date,
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;

    return (
        <Stack spacing={1}>
            <DaysHeader date={date} />

            <WeekView
                date={date}
                Cell={(props) => (
                    <Cell
                        {...props}
                        events={getCellEvents(events, props.date)}
                    />
                )}
                Numbering={StyledNumbering}
                {...props}
            />
        </Stack>
    );
};

export default CalendarWeekView;
