import dynamic from "next/dynamic";
import useExclusivePopper from "./useExclusivePopper";
import { TCalendarEvent } from "@/components/Calendar/types";
import { forwardRef, useImperativeHandle } from "react";

const EventPopper = dynamic(() => import("@/sections/Calendar/Event/View"));
const CreatePopper = dynamic(() => import("@/sections/Calendar/Event/Create"));

interface RendererProps {}

interface RendererRef {
    setEvent: (el: HTMLDivElement, v: TCalendarEvent) => void;
    setStartDate: (el: HTMLDivElement, v: string) => void;
}

const Renderer = forwardRef<RendererRef, RendererProps>((props, ref) => {
    const [
        isOpen,
        anchorEl,
        // ...
        event,
        startDate,
        // ...
        setEvent,
        setStartDate,
        // ...
        closePopper,
    ] = useExclusivePopper();

    useImperativeHandle(
        ref,
        () => ({
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
