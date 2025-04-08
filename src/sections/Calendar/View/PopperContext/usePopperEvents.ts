import { MouseEvent } from "react";
import useCustomEvent, { TCb } from "./useCustomEvent";
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
    DRAG_END,
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
    [EVENTS.DRAG_END]: DragEndEventData;
    [EVENTS.RESIZE_END]: ResizeEndEventData;

    [EVENTS.CLOSE]: undefined;
};

// ---------------------------------------------------------------

interface PopperEventData<E extends EVENTS = EVENTS> {
    event: E;
    other: PopperEventDataMap[E];
}
type TPopperEventCb = TCb<PopperEventData>;

const usePopperEvents = (cb: TCb<PopperEventData>, el: HTMLElement | null) =>
    useCustomEvent<PopperEventData>(name, cb, el || undefined);

export { STATES, EVENTS };
export type { TPopperEventCb, PopperEventData, PopperEventDataMap };
export default usePopperEvents;
