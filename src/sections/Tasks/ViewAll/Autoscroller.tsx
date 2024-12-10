import { FC, RefObject, useEffect, useRef } from "react";

interface AutoscrollerProps {
    containerRef: RefObject<HTMLDivElement>;
    lastColumnId?: number;
    mode?: "horizontalEnd" | "verticalEnd";
}

const Autoscroller: FC<AutoscrollerProps> = ({
    containerRef,
    lastColumnId = -1,
    mode = "horizontalEnd",
}) => {
    const record = useRef(lastColumnId);

    useEffect(() => {
        // invalid; abort
        if (lastColumnId === -1) return;

        // stop on no change (this should not happen, except initially)
        if (record.current === lastColumnId) return;

        // update our record
        record.current = lastColumnId;

        // scroll to end of container width/height
        containerRef.current?.scrollTo({
            ...(mode === "horizontalEnd"
                ? { left: containerRef.current.scrollWidth }
                : { top: containerRef.current.scrollHeight }),
            behavior: "smooth",
        });
    }, [lastColumnId]);

    return null;
};

export default Autoscroller;
