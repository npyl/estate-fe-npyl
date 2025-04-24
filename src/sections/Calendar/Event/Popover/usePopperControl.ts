import { useCallback, useEffect, useRef } from "react";
import { Instance } from "@popperjs/core";

const usePopperControl = () => {
    // INFO: when EditForm loads, it causes a big shift to the popover's height
    // which makes the (previous) optimal position (calculated by popper.js internally) wrong!
    // Make sure we get a good positioning after EditForm load!
    const actionsRef = useRef<Instance>();
    const onPopperRef = useCallback((i: Instance) => {
        if (!i) return;
        actionsRef.current = i;
    }, []);

    const updatePositioning = useCallback(
        () => actionsRef.current?.update(),
        []
    );

    const resizeObserver = useRef<ResizeObserver>();
    const paperRef = useRef<HTMLDivElement>();

    const onPaperRef = useCallback((e: HTMLDivElement | null) => {
        if (!e) return;
        if (resizeObserver.current) return;

        paperRef.current = e;

        // Create a ResizeObserver to monitor height changes
        resizeObserver.current = new ResizeObserver((entries) => {
            for (const _ of entries) {
                updatePositioning();
            }
        });

        // Start observing the content element
        resizeObserver.current.observe(e);
    }, []);

    const show = useCallback(() => {
        paperRef.current!.style.visibility = "visible";
    }, []);
    const hide = useCallback(() => {
        paperRef.current!.style.visibility = "hidden";
    }, []);

    useEffect(() => {
        return () => {
            resizeObserver.current?.disconnect();
        };
    }, []);

    return {
        onPopperRef,
        onPaperRef,
        // ...
        actionsRef,
        show,
        hide,
    };
};

export default usePopperControl;
