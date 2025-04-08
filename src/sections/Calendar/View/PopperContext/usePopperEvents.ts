import { MouseEvent } from "react";
import useCustomEvent, { TCb } from "./useCustomEvent";

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
}

interface PopperEventDataOther {}

interface PopperEventData {
    event: EVENTS;
    other: PopperEventDataOther;
}

type TPopperEventCb = TCb<PopperEventData>;

const usePopperEvents = (cb: TCb<PopperEventData>, el: HTMLElement | null) =>
    useCustomEvent<PopperEventData>(name, cb, el || undefined);

export { STATES, EVENTS };
export type { TPopperEventCb, PopperEventData };
export default usePopperEvents;
