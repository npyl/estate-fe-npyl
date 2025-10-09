import toNumberSafe from "@/utils/toNumberSafe";
import { RefObject, useCallback } from "react";
import { PaneRef } from "./Pane";

const useMinMaxControl = (
    valueMin: number | undefined,
    valueMax: number | undefined,
    _setMin: (v?: number) => void,
    _setMax: (v?: number) => void,
    fromRef: RefObject<PaneRef>,
    toRef: RefObject<PaneRef>
) => {
    const clearMin = useCallback(() => {
        // clear store
        _setMin(undefined);

        // clear textfied
        fromRef.current?.clear();
    }, [_setMin]);
    const clearMax = useCallback(() => {
        // clear store
        _setMax(undefined);

        // clear textfield
        toRef.current?.clear();
    }, [_setMax]);

    const setMin = useCallback(
        (s: string) => {
            const o = toNumberSafe(s);
            if (o === -1) return;

            const shouldClear = valueMax && o > valueMax;
            if (shouldClear) clearMax();

            _setMin(o);
            fromRef.current?.setValue(o.toString());
        },
        [valueMax, _setMin, clearMax]
    );

    const setMax = useCallback(
        (s: string) => {
            const o = toNumberSafe(s);
            if (o === -1) return;

            const shouldClear = valueMin && o < valueMin;
            if (shouldClear) clearMin();

            _setMax(o);
            toRef.current?.setValue(o.toString());
        },
        [valueMin, _setMax, clearMin]
    );

    return { setMin, setMax, clearMin, clearMax };
};

export default useMinMaxControl;
