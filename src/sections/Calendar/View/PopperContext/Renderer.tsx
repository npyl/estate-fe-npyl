import dynamic from "next/dynamic";
import useExclusivePopper from "./useExclusivePopper";
import { TCalendarEvent } from "@/components/Calendar/types";
import { forwardRef, RefObject, useCallback, useImperativeHandle } from "react";
import { dispatchUpdateDates } from "./updateDates";
import { notifyCells } from "./notifyCells";
import sleep from "@/utils/sleep";
import { usePopperContext } from ".";
import { EVENTS, STATES } from "./usePopperEvents";

const EventPopper = dynamic(() => import("@/sections/Calendar/Event/View"));
const CreatePopper = dynamic(() => import("@/sections/Calendar/Event/Create"));

interface RendererProps {
    onClose: VoidFunction;
}

interface RendererRef {
    updateDates: (startDate: string, endDate: string) => void;
    setEvent: (el: HTMLDivElement, v: TCalendarEvent) => void;
    setStartDate: (el: HTMLDivElement, v: string) => void;
    closePopper: VoidFunction;
}

const Renderer = forwardRef<RendererRef, RendererProps>(({ onClose }, ref) => {
    const [
        anchorEl,
        updateAnchor,
        // ...
        event,
        startDate,
        // ...
        setEvent,
        setStartDate,
        // ...
        closePopper,
    ] = useExclusivePopper();

    const updateDates = useCallback(
        async (startDate: string, endDate: string) => {
            dispatchUpdateDates(startDate, endDate);
            await sleep(500);
            notifyCells(startDate, endDate);
        },
        []
    );

    useImperativeHandle(
        ref,
        () => ({
            updateDates,
            setEvent,
            setStartDate,
            closePopper,
        }),
        []
    );

    return (
        <>
            {event ? (
                <EventPopper
                    anchorEl={anchorEl}
                    event={event}
                    onClose={onClose}
                />
            ) : null}

            {startDate && anchorEl ? (
                <CreatePopper
                    anchorEl={anchorEl}
                    startDate={startDate}
                    onClose={onClose}
                />
            ) : null}
        </>
    );
});

Renderer.displayName = "PopperRenderer";

export type { RendererRef };
export default Renderer;
