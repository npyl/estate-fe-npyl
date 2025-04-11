import { StackProps } from "@mui/material";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
} from "../types";

interface EventProps extends StackProps {
    event: TCalendarEvent;
    overlapCount?: number;

    onEventClick?: TOnEventClick;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
}

export type { EventProps };
