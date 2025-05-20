import { RefObject, useCallback, useLayoutEffect, useRef } from "react";

const useAvailableHeight = (
    targetRef: RefObject<HTMLDivElement>,
    observeRoot: RefObject<HTMLElement> = { current: document.body }
) => {
    const observerRef = useRef<MutationObserver | null>(null);

    const updateHeight = useCallback(() => {
        const el = targetRef.current;
        if (!el) return;

        const boardTop = el.getBoundingClientRect().top;
        const availableHeight = window.innerHeight - boardTop - 16;
        const newHeight = `${availableHeight}px`;

        el.style.height = newHeight;
    }, []);

    useLayoutEffect(() => {
        // Set up the MutationObserver to detect DOM changes
        if (observeRoot.current) {
            observerRef.current = new MutationObserver((mutations) => {
                // Check if any mutation could affect layout
                const shouldUpdate = mutations.some(
                    (mutation) =>
                        mutation.type === "childList" ||
                        mutation.type === "attributes" ||
                        (mutation.type === "characterData" &&
                            mutation.target.parentElement !== targetRef.current)
                );

                if (!shouldUpdate) return;

                // Use requestAnimationFrame to ensure we update after the browser has processed the DOM changes
                requestAnimationFrame(updateHeight);
            });

            // Start observing DOM changes
            observerRef.current.observe(observeRoot.current, {
                childList: true, // Watch for added/removed elements
                attributes: true, // Watch for attribute changes
                characterData: true, // Watch for text changes
                subtree: true, // Observe all descendants
            });
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    useLayoutEffect(() => {
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);
};

export default useAvailableHeight;
