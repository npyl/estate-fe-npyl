import { PopoverActions } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";

const usePopoverPosition = () => {
    // INFO: when EditForm loads, it causes a big shift to the popover's height
    // which makes the (previous) optimal position (calculated by popper.js internally) wrong!
    // Make sure we get a good positioning after EditForm load!
    const actionsRef = useRef<PopoverActions>(null);

    const updatePositioning = useCallback(
        () => actionsRef.current?.updatePosition(),
        []
    );

    const resizeObserver = useRef<ResizeObserver>();
    const popoverRef = useRef<HTMLDivElement>();

    const onPaperRef = useCallback((e: HTMLDivElement | null) => {
        if (!e) return;
        if (resizeObserver.current) return;

        popoverRef.current = e;

        // Create a ResizeObserver to monitor height changes
        resizeObserver.current = new ResizeObserver((entries) => {
            for (const entry of entries) {
                updatePositioning();
            }
        });

        // Start observing the content element
        resizeObserver.current.observe(e);
    }, []);

    useEffect(() => {
        return () => {
            resizeObserver.current?.disconnect();
        };
    }, []);

    return { actionsRef, onPaperRef };
};

export default usePopoverPosition;
