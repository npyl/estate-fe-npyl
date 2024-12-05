import { FC, RefObject, useEffect, useRef } from "react";

interface AutoscrollerProps {
    rowRef: RefObject<HTMLDivElement>;
    lastColumnId?: number;
}

const Autoscroller: FC<AutoscrollerProps> = ({ rowRef, lastColumnId = -1 }) => {
    const record = useRef(lastColumnId);

    useEffect(() => {
        // invalid; abort
        if (lastColumnId === -1) return;

        // stop on no change (this should not happen, except initially)
        if (record.current === lastColumnId) return;

        // update our record
        record.current = lastColumnId;

        // scroll to end of row
        rowRef.current?.scrollTo({
            left: rowRef.current.scrollWidth,
            behavior: "smooth",
        });
    }, [lastColumnId]);

    return null;
};

export default Autoscroller;
