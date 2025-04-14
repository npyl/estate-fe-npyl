import useExclusivePopper from "./useExclusivePopper";
import { TCalendarEvent } from "@/components/Calendar/types";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import EventPopper, {
    ViewEventPopperRef,
} from "@/sections/Calendar/Event/View";
import CreatePopper, {
    CreateEventPopperRef,
} from "@/sections/Calendar/Event/Create";

interface RendererProps {
    onClose: VoidFunction;
}

interface RendererRef {
    updateDates: (startDate: string, endDate: string) => void;
    setEvent: (el: HTMLDivElement, v: TCalendarEvent) => void;
    setStartDate: (el: HTMLDivElement, v: string) => void;

    updatePopperPosition: (el: HTMLElement) => void;
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

    //
    //  Refresh Position
    //
    const viewPopperRef = useRef<ViewEventPopperRef>(null);
    const createPopperRef = useRef<CreateEventPopperRef>(null);
    const updatePopperPosition = useCallback(
        (el: HTMLElement) => {
            updateAnchor(el);
            const target = event
                ? viewPopperRef
                : startDate
                ? createPopperRef
                : undefined;
            target?.current?.updatePosition();
        },
        [event, startDate]
    );

    const updateDates = useCallback(
        async (s: string, e: string) => {
            if (!startDate) return;
            createPopperRef.current?.updateDates(s, e);
        },
        [startDate]
    );

    useImperativeHandle(
        ref,
        () => ({
            updateDates,
            setEvent,
            setStartDate,
            // ...
            updatePopperPosition,
            closePopper,
        }),
        [updatePopperPosition, updateDates]
    );

    return (
        <>
            {event ? (
                <EventPopper
                    ref={viewPopperRef}
                    anchorEl={anchorEl}
                    event={event}
                    onClose={onClose}
                />
            ) : null}

            {startDate && anchorEl ? (
                <CreatePopper
                    ref={createPopperRef}
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
