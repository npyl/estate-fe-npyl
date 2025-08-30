import { RefObject, useCallback, useLayoutEffect, useRef } from "react";

const FALLBACK_OFFSET = 16;

const isAcceptedMutation =
    (targetRef: RefObject<HTMLElement>) => (mutation: MutationRecord) =>
        mutation.type === "childList" ||
        mutation.type === "attributes" ||
        (mutation.type === "characterData" &&
            mutation.target.parentElement !== targetRef.current);

const OBSERVER_CONFIG: MutationObserverInit = {
    childList: true, // Watch for added/removed elements
    attributes: true, // Watch for attribute changes
    characterData: true, // Watch for text changes
    subtree: true, // Observe all descendants
};

const useResizeObserver = (
    targetRef: RefObject<HTMLElement>,
    observeRoot: RefObject<HTMLElement>,
    cb: VoidFunction
) => {
    const observerRef = useRef<MutationObserver | null>(null);

    const observeCb: MutationCallback = useCallback((mutations) => {
        // Check if any mutation could affect layout
        const shouldUpdate = mutations.some(isAcceptedMutation(targetRef));
        if (!shouldUpdate) return;

        // Use requestAnimationFrame to ensure we update after the browser has processed the DOM changes
        requestAnimationFrame(cb);
    }, []);

    useLayoutEffect(() => {
        if (!observeRoot.current) return;

        // Layout observer
        observerRef.current = new MutationObserver(observeCb);
        observerRef.current.observe(observeRoot.current, OBSERVER_CONFIG);

        // Window Resize observer
        window.addEventListener("resize", cb);

        return () => {
            observerRef.current?.disconnect();
            window.removeEventListener("resize", cb);
        };
    }, []);
};

/**
 * A React hook that automatically calculates and sets the available height
 * for an element (target) based on its position within a container (observeRoot).
 *
 * This hook is useful for creating responsive layouts where an element should
 * fill the remaining vertical space in its container, such as:
 * - Scrollable content areas
 * - Full-height sidebars
 * - Dynamic height modals or panels
 *
 * The hook automatically recalculates height when:
 * - The window is resized
 * - DOM mutations occur that might affect layout
 * - The target element's position changes
 *
 * IMPORTANT: if other elements exist inside the container (observeRoot) the calculation will not account for them!
 *
 * @param targetRef - A React ref pointing to the element whose height should be managed
 * @param observeRoot - Optional ref to the container element to observe for changes.
 *                     Defaults to document.body if not provided.
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import useAvailableHeight from './useAvailableHeight';
 *
 * const ScrollablePanel = () => {
 *   const contentRef = useRef<HTMLDivElement>(null);
 *   const containerRef = useRef<HTMLDivElement>(null);
 *
 *   // This will make the content fill the remaining height in the container
 *   useAvailableHeight(contentRef, containerRef);
 *
 *   return (
 *     <div ref={containerRef} className="panel">
 *       <header>Fixed Header</header>
 *       <div ref={contentRef} className="scrollable-content">
 *         <p>Scrollable content...</p>
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 */
const useAvailableHeight = (
    targetRef: RefObject<HTMLElement>,
    observeRoot: RefObject<HTMLElement> = { current: document.body }
) => {
    const updateHeight = useCallback(() => {
        const el = targetRef.current;
        const rootEl = observeRoot.current;
        if (!el || !rootEl) return;

        const targetRect = el.getBoundingClientRect();
        const rootRect = rootEl.getBoundingClientRect();
        const rootPaddingBottom =
            parseFloat(getComputedStyle(rootEl).paddingBottom) || 0;
        const rootBottom = rootRect.bottom - rootPaddingBottom;

        // Available space is from target's current position to the bottom of the container
        const height = rootBottom - targetRect.top - FALLBACK_OFFSET;

        // Ensure minimum height
        const safeHeight = Math.max(0, height);

        el.style.height = `${safeHeight}px`;
    }, [targetRef, observeRoot]);

    useResizeObserver(targetRef, observeRoot, updateHeight);

    useLayoutEffect(() => {
        updateHeight();
    }, []);
};

export { FALLBACK_OFFSET };
export default useAvailableHeight;
