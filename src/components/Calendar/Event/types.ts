import { StackProps } from "@mui/material";
import { TCalendarEvent, TCalendarEventEvents } from "../types";

interface EventProps extends StackProps, TCalendarEventEvents {
    event: TCalendarEvent;
    overlapCount: number;
}

export type { EventProps };
