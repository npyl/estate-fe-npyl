import useDialog from "@/hooks/useDialog";
import { useCallback, useRef } from "react";

const useExclusivePopper = <T0, T1>(
    initial0: T0 | undefined,
    initial1: T1 | undefined
) => {
    const anchorRef = useRef<HTMLDivElement | undefined>(undefined);

    const state0 = useRef<T0 | undefined>(initial0);
    const state1 = useRef<T1 | undefined>(initial1);

    const [isOpen, openPopper, _closePopper] = useDialog();

    const closePopper = useCallback(() => {
        state0.current = initial0;
        state1.current = initial1;
        _closePopper();
    }, []);

    const set0 = useCallback((el: HTMLDivElement, v: T0 | undefined) => {
        closePopper();
        anchorRef.current = el;
        state0.current = v;
        openPopper();
    }, []);

    const set1 = useCallback((el: HTMLDivElement, v: T1 | undefined) => {
        // INFO: this a click on foreign Cell doesn't cause a reopen
        if (anchorRef.current) {
            anchorRef.current = undefined;
            closePopper();
            return;
        }

        closePopper();
        anchorRef.current = el;
        state1.current = v;
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

export default useExclusivePopper;
