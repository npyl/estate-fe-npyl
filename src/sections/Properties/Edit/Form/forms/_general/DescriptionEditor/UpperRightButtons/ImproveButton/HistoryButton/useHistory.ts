import { RefObject, useCallback, useRef } from "react";

type TValue = any;
type TPastCb = (b: boolean) => void;

const useHistory = <T extends TValue>(
    buttonUndoRef: RefObject<HTMLButtonElement>,
    buttonRedoRef: RefObject<HTMLButtonElement>
) => {
    const rootRef = useRef<T[]>([]);
    const index = useRef(-1);

    // ------------------------------------------------------------------------

    const getSize = useCallback(() => rootRef.current.length, []);
    const getIndexedSize = useCallback(() => getSize() - 1, []);

    const calculateVisibility = useCallback((onPast?: TPastCb) => {
        if (!buttonUndoRef.current || !buttonRedoRef.current) return;

        const indexedSize = getIndexedSize();

        buttonUndoRef.current.style.display =
            indexedSize - index.current >= 0 && index.current !== 0
                ? "block"
                : "none";

        buttonRedoRef.current.style.display =
            index.current === indexedSize ? "none" : "block";

        onPast?.(indexedSize !== index.current);
    }, []);

    const getCurrent = useCallback(() => rootRef.current.at(index.current), []);

    // ------------------------------------------------------------------------

    const initialise = useCallback((v: T) => {
        rootRef.current.push(v);
        index.current = 0;
    }, []);

    const push = useCallback((v: T) => {
        rootRef.current.push(v);
        index.current = getIndexedSize();
        calculateVisibility();
    }, []);

    const previous = useCallback((onPast: TPastCb) => {
        index.current = Math.max(index.current - 1, 0);
        calculateVisibility(onPast);
        return getCurrent();
    }, []);
    const next = useCallback((onPast: TPastCb) => {
        index.current = Math.min(index.current + 1, getIndexedSize());
        calculateVisibility(onPast);
        return getCurrent();
    }, []);

    return { initialise, push, previous, next, getSize };
};

export default useHistory;
