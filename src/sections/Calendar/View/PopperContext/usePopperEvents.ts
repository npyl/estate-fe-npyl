import { MouseEvent, RefObject } from "react";
import useCustomEvent, { TCb } from "@/hooks/useCustomEvent";
import { TCalendarEvent } from "@/components/Calendar/types";

const name = "onPPCalendar-PopperEvent";

enum STATES {
    IDLE,
    POPPER,
    POPPER_CREATE,
}

enum EVENTS {
    CLICK,
    CLICK_EVENT,
    DRAG_START,
    DRAG_END,
    RESIZE_START,
    RESIZE_END,
    CLOSE,
}

// ---------------------------------------------------------------

interface ClickEventData {
    me: MouseEvent<HTMLDivElement>;
    ce: TCalendarEvent;
}

interface ClickEventCreateData {
    me: MouseEvent<HTMLDivElement>;
    startDate: string;
}

interface DragResizeStartData {
    eventId: string;
}

interface DragEndEventData {
    ce: TCalendarEvent;
    startDate: string;
    endDate: string;
}

interface ResizeEndEventData {
    ce: TCalendarEvent;
    h: number;
}

type PopperEventDataMap = {
    [EVENTS.CLICK]: ClickEventData;
    [EVENTS.CLICK_EVENT]: ClickEventCreateData;
    [EVENTS.DRAG_START]: DragResizeStartData;
    [EVENTS.DRAG_END]: DragEndEventData;
    [EVENTS.RESIZE_START]: DragResizeStartData;
    [EVENTS.RESIZE_END]: ResizeEndEventData;

    [EVENTS.CLOSE]: undefined;
};

// ---------------------------------------------------------------

interface PopperEventData<E extends EVENTS = EVENTS> {
    event: E;
    other: PopperEventDataMap[E];
}
type TPopperEventCb = TCb<PopperEventData>;

const usePopperEvents = (
    cb: TCb<PopperEventData>,
    targetRef: RefObject<HTMLElement | null>
) => useCustomEvent<PopperEventData>(name, cb, targetRef);

export { STATES, EVENTS };
export type { TPopperEventCb, PopperEventData, PopperEventDataMap };
export default usePopperEvents;
