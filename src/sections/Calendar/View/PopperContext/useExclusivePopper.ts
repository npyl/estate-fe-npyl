import { TCalendarEvent } from "@/components/Calendar/types";
import useDialog from "@/hooks/useDialog";
import { useCallback, useRef } from "react";

const UpdateEvent = "onUpdateCreateEvent";

const useExclusivePopper = () => {
    const anchorRef = useRef<HTMLDivElement | undefined>(undefined);

    const state0 = useRef<TCalendarEvent>();
    const state1 = useRef<string>();

    const [isOpen, openPopper, _closePopper] = useDialog();

    const closePopper = useCallback(() => {
        // INFO: remove all "create"-events
        notifyUpdate("");

        state0.current = undefined;
        state1.current = "";

        _closePopper();
    }, []);

    const notifyUpdate = useCallback((detail?: string) => {
        const CE = new CustomEvent(UpdateEvent, { detail });
        document.dispatchEvent(CE);
    }, []);

    const set0 = useCallback((el: HTMLDivElement, v?: TCalendarEvent) => {
        closePopper();
        anchorRef.current = el;
        state0.current = v;
        openPopper();
    }, []);

    const set1 = useCallback((el: HTMLDivElement, v?: string) => {
        // INFO: this a click on foreign Cell doesn't cause a reopen
        if (anchorRef.current) {
            anchorRef.current = undefined;
            closePopper();
            return;
        }

        closePopper();
        anchorRef.current = el;
        state1.current = v;

        // INFO: Notify all cells to update "create"-events (if any)
        notifyUpdate(v);

        openPopper();
    }, []);

    return [
        isOpen,
        anchorRef.current,
        // ...
        state0.current,
        state1.current,
        // ...
        set0,
        set1,
        // ...
        closePopper,
    ] as const;
};

export { UpdateEvent };
export default useExclusivePopper;
