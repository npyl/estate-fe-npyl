import { TCalendarEvent } from "@/components/Calendar/types";
import { useCallback, useState } from "react";

const useExclusivePopper = () => {
    const [anchorEl, updateAnchor] = useState<HTMLElement>();

    const [state0, setState0] = useState<TCalendarEvent>();
    const [state1, setState1] = useState<string>();

    const closePopper = useCallback(() => {
        setState0(undefined);
        setState1(undefined);
    }, []);

    const set0 = useCallback((el: HTMLDivElement, v?: TCalendarEvent) => {
        updateAnchor(el);
        setState0(v);
    }, []);

    const set1 = useCallback((el: HTMLDivElement, v?: string) => {
        updateAnchor(el);
        setState1(v);
    }, []);

    return [
        anchorEl,
        updateAnchor,
        // ...
        state0,
        state1,
        // ...
        set0,
        set1,
        // ...
        closePopper,
    ] as const;
};

export default useExclusivePopper;
