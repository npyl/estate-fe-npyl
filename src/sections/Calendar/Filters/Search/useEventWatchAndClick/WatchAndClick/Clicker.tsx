import debugLog from "@/_private/debugLog";
import { BASE_VIEW_ID } from "@/components/BaseCalendar";
import { getEventId } from "@/components/Calendar/Event/constants";
import { FC, useCallback, useLayoutEffect, useRef } from "react";

const DELAY = 5000; // 5sec

interface ClickerProps {
    eventId: string;
    onClose: VoidFunction;
}

const Clicker: FC<ClickerProps> = ({ eventId, onClose }) => {
    const observerRef = useRef<MutationObserver>();

    // -------------------------------------------------------------------------

    const timeoutRef = useRef(-1);
    useLayoutEffect(() => {
        timeoutRef.current = window.setTimeout(onClose, DELAY);
    }, [onClose]);

    // -------------------------------------------------------------------------

    const clear = useCallback(() => {
        debugLog("Clearing...");
        observerRef.current?.disconnect();
        clearTimeout(timeoutRef.current);
    }, []);

    const onQuery = useCallback(
        (id: string) => () => {
            debugLog("Querying...");

            const element = document.getElementById(id) as HTMLElement;
            if (!element) return;

            clear();

            debugLog("FOUND!");

            element.click();
        },
        []
    );

    // -------------------------------------------------------------------------

    useLayoutEffect(() => {
        const view = document.getElementById(BASE_VIEW_ID);
        if (!view) return;

        const id = getEventId(eventId);

        debugLog("Registering...");

        observerRef.current = new MutationObserver(onQuery(id));

        observerRef.current.observe(view, { childList: true, subtree: true });

        return () => {
            debugLog("Unmount...");
            clear();
        };
    }, [eventId, onQuery, clear]);

    return null;
};

export default Clicker;
