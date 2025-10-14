import { getEventId } from "../../constants";

const GHOST_CLASSNAME = "PPCalendar-EventGhost";

const getGhostTestId = (eventId: string) => `PPCalendar-EventGhost-${eventId}`;

/**
 * Converts viewport-relative coordinates to document-relative coordinates.
 *
 * This is useful when positioning elements with `position: absolute` relative to the document,
 * as `getBoundingClientRect()` returns coordinates relative to the current viewport.
 *
 * @param rect - A DOMRect object (typically from `getBoundingClientRect()`)
 * @returns An object containing document-relative coordinates
 */
const getDocumentPosition = (rect: DOMRect) => ({
    left: `${rect.left + window.scrollX}px`,
    top: `${rect.top + window.scrollY}px`,
});

const createGhost = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    // Extract key styles to copy
    const style = {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        padding: computedStyle.padding,
        margin: computedStyle.margin,
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        fontSize: computedStyle.fontSize,
        fontFamily: computedStyle.fontFamily,
        borderRadius: computedStyle.borderRadius,
        border: computedStyle.border,
        boxShadow: computedStyle.boxShadow,
        transform: computedStyle.transform,
        // Position-specific styles
        position: "absolute",
        ...getDocumentPosition(rect),
        // Ghost-specific styles
        opacity: 0.4,
        pointerEvents: "none",
        userSelect: "none",
    };

    return style;
};

const removeGhost = (el: Element) => el.remove();

// ---------------------------------------------------------------------

const addGhost = (eventId: string) => {
    const el = document.getElementById(getEventId(eventId));
    if (!el) return;

    // Create ghost style
    const ghostStyle = createGhost(el);

    // Create a new div element
    const ghostElement = document.createElement("div");

    // ClassName & data-testid
    const GHOST_TESTID = getGhostTestId(eventId);
    ghostElement.setAttribute("data-testid", GHOST_TESTID);
    ghostElement.className = GHOST_CLASSNAME;

    // Apply all the computed styles to the ghost element
    Object.assign(ghostElement.style, ghostStyle);

    // Optional: Copy the inner content if needed
    ghostElement.innerHTML = el.innerHTML;

    // Append the ghost element to the document body
    document.body.appendChild(ghostElement);

    // Return the ghost element in case it needs to be referenced later
    // (e.g., for removing it when drag ends)
    return ghostElement;
};

const removeGhosts = () => {
    const els = document.getElementsByClassName(GHOST_CLASSNAME);
    const all = Array.from(els);
    all.forEach(removeGhost);
};

export {
    getGhostTestId,
    // ...
    addGhost,
    removeGhosts,
};
