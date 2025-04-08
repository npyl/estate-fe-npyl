import { TCalendarEvent } from "@/components/Calendar/types";
import { useCallback, useRef, useState } from "react";

const useExclusivePopper = () => {
    const anchorRef = useRef<HTMLDivElement | undefined>(undefined);
    const updateAnchor = useCallback((e: HTMLDivElement) => {
        anchorRef.current = e;
    }, []);

    const [state0, setState0] = useState<TCalendarEvent>();
    const [state1, setState1] = useState<string>();

    const closePopper = useCallback(() => {
        setState0(undefined);
        setState1(undefined);
    }, []);

    const set0 = useCallback((el: HTMLDivElement, v?: TCalendarEvent) => {
        anchorRef.current = el;
        setState0(v);
    }, []);

    const set1 = useCallback((el: HTMLDivElement, v?: string) => {
        anchorRef.current = el;
        setState1(v);
    }, []);

    return [
        anchorRef.current,
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
