import { useCallback } from "react";
import { TOnEventDragEnd, TOnEventResizeEnd } from "../../../types";
import { addGhost, removeGhosts } from "./util";

const useGhost = (
    eventId: string,
    _onEventDragEnd: TOnEventDragEnd | undefined,
    _onEventResizeEnd?: TOnEventResizeEnd | undefined
) => {
    const onGhostAdd = useCallback(() => {
        addGhost(eventId);
    }, [eventId]);
    const onGhostRemove = useCallback(() => {
        removeGhosts();
    }, []);

    const onEventDragEnd: TOnEventDragEnd = useCallback(
        (...args) => {
            onGhostRemove();
            _onEventDragEnd?.(...args);
        },
        [_onEventDragEnd]
    );

    const onEventResizeEnd: TOnEventResizeEnd = useCallback(
        (...args) => {
            onGhostRemove();
            _onEventResizeEnd?.(...args);
        },
        [_onEventResizeEnd]
    );

    return { onGhostAdd, onGhostRemove, onEventDragEnd, onEventResizeEnd };
};

export default useGhost;
