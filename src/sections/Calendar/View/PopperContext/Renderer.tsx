import dynamic from "next/dynamic";
import useExclusivePopper from "./useExclusivePopper";
import { TCalendarEvent } from "@/components/Calendar/types";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { dispatchUpdateDates } from "./updateDates";
import { notifyCells } from "./notifyCells";
import sleep from "@/utils/sleep";

const EventPopper = dynamic(() => import("@/sections/Calendar/Event/View"));
const CreatePopper = dynamic(() => import("@/sections/Calendar/Event/Create"));

interface RendererProps {}

interface RendererRef {
    updateDates: (startDate: string, endDate: string) => void;
    setEvent: (el: HTMLDivElement, v: TCalendarEvent) => void;
    setStartDate: (el: HTMLDivElement, v: string) => void;
}

const Renderer = forwardRef<RendererRef, RendererProps>((props, ref) => {
    const [
        isOpen,
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
        }),
        []
    );

    if (!isOpen) return null;

    return (
        <>
            {event ? (
                <EventPopper
                    anchorEl={anchorEl}
                    event={event}
                    onClose={closePopper}
                />
            ) : null}

            {startDate && anchorEl ? (
                <CreatePopper
                    anchorEl={anchorEl}
                    startDate={startDate}
                    onClose={closePopper}
                />
            ) : null}
        </>
    );
});

Renderer.displayName = "PopperRenderer";

export type { RendererRef };
export default Renderer;
