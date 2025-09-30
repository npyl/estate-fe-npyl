import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
    TOnEventResizeStart,
} from "../../../types";
import WithNoDragClick from "@/components/Calendar/WithNoDragClick";
import WithDrag, { DraggableProps } from "./WithDrag";
import Container from "../Container";
import WithResize from "./WithResize";

interface EventsTargetProps extends DraggableProps {
    event: TCalendarEvent;

    onEventClick?: TOnEventClick;
    onEventResizeStart?: TOnEventResizeStart;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
}

const EventsTarget = WithResize(
    WithDrag(WithNoDragClick(Container) as any) as any
);

export type { EventsTargetProps };
export default EventsTarget;
