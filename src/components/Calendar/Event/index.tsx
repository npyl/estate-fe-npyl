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
import { DAY_CELL_HEIGHT, START_HOUR, Z_INDEX } from "@/constants/calendar";
import dynamic from "next/dynamic";
import Duration from "./_shared/Duration";
import Title from "./_shared/Title";
import Actions from "./_shared/Actions";
const Members = dynamic(() => import("./_shared/Members"));

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
    backgroundColor: ({ palette }) => palette.background.paper,
    borderRadius: "10px",
    marginLeft: (theme) => theme.spacing(1),
    marginRight: (theme) => theme.spacing(1),
    boxShadow: (theme) => theme.shadows[20],
    zIndex: Z_INDEX.EVENT,
    transition: "all 0.3s ease",

    //
    // Action Buttons support
    //
    position: "relative",

    "&:hover .Calendar-Event-Action-Buttons": {
        opacity: 1,
        pointerEvents: "auto",
    },
};

export interface CalendarEventProps extends Omit<BoxProps, "ref"> {
    event: TCalendarEvent;
    onEdit?: (e: TCalendarEvent) => void;
    onDelete?: (id: string) => void;
}

const CalendarEvent = forwardRef<HTMLDivElement, CalendarEventProps>(
    ({ event, onEdit, onDelete, ...props }, ref) => {
        const { top, height } = calculateEventPosition(event);

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

        const handleEdit = () => onEdit?.(event);

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
                        </Stack>

                        <Box flexGrow={1} />

                        <Stack p={1}>
                            <Members ids={[1, 2, 3, 4, 5]} />
                        </Stack>
                    </>
                ) : null}

                <Actions
                    eventId={event.id}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                />
            </Stack>
        );
    }
);

export default CalendarEvent;
