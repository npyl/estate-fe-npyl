import { BaseCalendarDayViewProps } from "@/components/BaseCalendar/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { TCalendarEvent } from "./types";
import CalendarEvent from "../Event";
import { DAY_CELL_HEIGHT } from "./constant";

const hours = Array.from({ length: 24 }, (_, i) => i);

// ------------------------------------------------------------------

interface RowProps {
    hour: number;
}

const Row: FC<RowProps> = ({ hour }) => (
    <Stack
        borderBottom="1px solid"
        borderColor="divider"
        minHeight={DAY_CELL_HEIGHT}
        direction="row"
        alignItems="center"
    >
        <Typography
            variant="caption"
            width={50}
            textAlign="right"
            pr={1}
            color="text.secondary"
        >
            {`${hour.toString().padStart(2, "0")}:00`}
        </Typography>

        <Box flexGrow={1} height="100%" />
    </Stack>
);

// ------------------------------------------------------------------

const getRow = (hour: number) => <Row key={hour} hour={hour} />;
const getEvent = (e: TCalendarEvent) => <CalendarEvent key={e.id} event={e} />;

// ------------------------------------------------------------------

const fakeEvents: TCalendarEvent[] = [
    {
        id: 1,
        title: "Team Meeting",
        location: "Conference Room A",
        startDate: new Date(2024, 9, 11, 9, 0), // 9:00 AM
        endDate: new Date(2024, 9, 11, 10, 30), // 10:30 AM
        withIds: [1, 2, 3],
    },
    {
        id: 2,
        title: "Lunch with Client",
        location: "Cafe Mocha",
        startDate: new Date(2024, 9, 11, 12, 0), // 12:00 PM
        endDate: new Date(2024, 9, 11, 13, 30), // 1:30 PM
        withIds: [4],
    },
    {
        id: 3,
        title: "Project Review",
        location: "Virtual Meeting",
        startDate: new Date(2024, 9, 11, 14, 0), // 2:00 PM
        endDate: new Date(2024, 9, 11, 15, 0), // 3:00 PM
        withIds: [2, 5, 6],
    },
    {
        id: 4,
        title: "Gym",
        location: "Fitness Center",
        startDate: new Date(2024, 9, 11, 18, 0), // 6:00 PM
        endDate: new Date(2024, 9, 11, 19, 30), // 7:30 PM
        withIds: [],
    },
];

const CalendarDayView: FC<BaseCalendarDayViewProps> = ({ date }) => {
    // INFO: filter today's events
    const events = fakeEvents.filter(
        (event) => event.startDate.toDateString() === date.toDateString()
    );

    return (
        <Stack position="relative" height="300px" overflow="hidden auto">
            {/* Rows */}
            {hours.map(getRow)}
            {/* Events */}
            {events.map(getEvent)}
        </Stack>
    );
};

export default CalendarDayView;
