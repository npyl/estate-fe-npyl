import { useCallback, useEffect, useRef } from "react";
import { Instance } from "@popperjs/core";

const usePopoverPosition = () => {
    // INFO: when EditForm loads, it causes a big shift to the popover's height
    // which makes the (previous) optimal position (calculated by popper.js internally) wrong!
    // Make sure we get a good positioning after EditForm load!
    const actionsRef = useRef<Instance>(null);

    const updatePositioning = useCallback(
        () => actionsRef.current?.update(),
        []
    );

    const resizeObserver = useRef<ResizeObserver>();

    const onPaperRef = useCallback((e: HTMLDivElement | null) => {
        if (!e) return;
        if (resizeObserver.current) return;

        // Create a ResizeObserver to monitor height changes
        resizeObserver.current = new ResizeObserver((entries) => {
            for (const _ of entries) {
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
