import { ForwardedRef, useCallback } from "react";

/**
 * Hook that observes the event's width on Stack's onLoad (using the ref), and calls the onGetWidth callback
 * @param ref the element's ref (exposed by forwardRef)
 * @param onGetWidth callback to handle a width value
 */
const useWidthObserver = (
    ref: ForwardedRef<HTMLDivElement>,
    onGetWidth: (width: number) => void
) => {
    const onEntries: ResizeObserverCallback = useCallback(
        (entries) => {
            const width = entries[0].contentRect.width;
            onGetWidth(width);
        },
        [onGetWidth]
    );

    const onRef = useCallback(
        (node: HTMLDivElement | null) => {
            // Combine refs
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }

            if (!node) return;

            const resizeObserver = new ResizeObserver(onEntries);

            resizeObserver.observe(node);
        },
        [ref, onEntries]
    );

    return { onRef };
};

export default useWidthObserver;
