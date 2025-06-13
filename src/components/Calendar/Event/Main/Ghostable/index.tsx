import { forwardRef } from "react";
import EventsTarget, { EventsTargetProps } from "../EventsTarget";
import useGhost from "./useGhost";

type OmitList = "onGhostAdd" | "onGhostRemove";

interface GhostableProps extends Omit<EventsTargetProps, OmitList> {}

const Ghostable = forwardRef<HTMLDivElement, GhostableProps>(
    (
        {
            onEventDragEnd: _onEventDragEnd,
            onEventResizeEnd: _onEventResizeEnd,
            ...props
        },
        ref
    ) => {
        const {
            onGhostAdd,
            onGhostRemove,
            // ...
            onEventDragEnd,
            onEventResizeEnd,
        } = useGhost(props.event.id, _onEventDragEnd, _onEventResizeEnd);

        return (
            <EventsTarget
                ref={ref}
                onEventDragEnd={onEventDragEnd}
                onEventResizeEnd={onEventResizeEnd}
                onGhostAdd={onGhostAdd}
                onGhostRemove={onGhostRemove}
                {...props}
            />
        );
    }
);

Ghostable.displayName = "Ghostable";
export type { GhostableProps };
export default Ghostable;
