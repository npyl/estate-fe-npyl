import { useCallback, useMemo, useRef, useState } from "react";

type TValue = object;

const useHistory = <T extends TValue>() => {
    const rootRef = useRef<T[]>([]);

    const [size, setSize] = useState(0);
    const [index, setIndex] = useState(-1);

    const push = useCallback((v: T) => {
        rootRef.current.push(v);
        setSize((old) => old + 1);
        setIndex((old) => old + 1);
    }, []);

    const next = useCallback(() => setIndex((old) => old + 1), []);
    const previous = useCallback(() => setIndex((old) => old - 1), []);

    const current = useMemo(() => rootRef.current?.at(index), [index]);

    return { current, size, push, next, previous };
};

export default useHistory;
