import { forwardRef } from "react";
import {
    Box,
    BoxProps,
    Stack,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import { TCalendarEvent } from "../types";
import { DAY_CELL_HEIGHT, START_HOUR } from "../constant";
import dynamic from "next/dynamic";
import Duration from "./Duration";
import Title from "./Title";
const Members = dynamic(() => import("./Members"));

// ------------------------------------------------------------------------------------

const calculateEventPosition = (event: TCalendarEvent) => {
    const startHour = new Date(event.startDate).getHours();
    const startMinutes = new Date(event.startDate).getMinutes();
    const endHour = new Date(event.endDate).getHours();
    const endMinutes = new Date(event.endDate).getMinutes();

    const top = (startHour - START_HOUR + startMinutes / 60) * DAY_CELL_HEIGHT;
    const height =
        (endHour - startHour + (endMinutes - startMinutes) / 60) *
        DAY_CELL_HEIGHT;

    return {
        top,
        height,
    };
};

// ------------------------------------------------------------------------------------

const EventSx: SxProps<Theme> = {
    position: "absolute",
    left: 50,
    right: 0,
    backgroundColor: ({ palette }) => palette.background.paper,
    borderRadius: "10px",
    marginLeft: (theme) => theme.spacing(1),
    marginRight: (theme) => theme.spacing(1),
    boxShadow: (theme) => theme.shadows[20],
    zIndex: 3,
};

// --------------------------------------------------------------------------

export interface CalendarEventProps extends Omit<BoxProps, "ref"> {
    event: TCalendarEvent;
}

const CalendarEvent = forwardRef<HTMLDivElement, CalendarEventProps>(
    ({ event, ...props }, ref) => {
        const { top, height } = calculateEventPosition(event);

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        return (
            <Stack
                ref={ref}
                sx={EventSx}
                top={top}
                height={maxHeight}
                {...props}
            >
                <Title
                    title={event.title}
                    mini={isMinimumHeight}
                    color={event.type.color}
                    startDate={event.startDate}
                    endDate={event.endDate}
                />

                {!isMinimumHeight ? (
                    <>
                        <Stack p={1} spacing={1}>
                            <Stack direction="row" justifyContent="flex-end">
                                <Duration
                                    start={event.startDate}
                                    end={event.endDate}
                                />
                            </Stack>

                            <Typography variant="subtitle2" noWrap>
                                A minor description
                            </Typography>

                            {/* {event.location ? (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                        >
                            {event.location}
                        </Typography>
                    ) : null} */}
                        </Stack>

                        <Box flexGrow={1} />

                        <Stack p={1}>
                            {/* {event.withIds.length > 0 ? ( */}
                            <Members ids={[1, 2, 3, 4, 5]} />
                            {/* ) : null} */}
                        </Stack>
                    </>
                ) : null}
            </Stack>
        );
    }
);

export default CalendarEvent;
