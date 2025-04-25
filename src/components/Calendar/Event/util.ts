import { EVENT_CLASSNAME } from ".";

const lock = (el: HTMLElement) => (el.style.pointerEvents = "none");
const unlock = (el: HTMLElement) => (el.style.pointerEvents = "initial");

const lockExcept = (eventId: string) => (el: HTMLElement) => {
    if (el.id === eventId) return;
    lock(el);
};

const lockAllEventsExcept = (eventId: string) => {
    const c = document.getElementsByClassName(EVENT_CLASSNAME);
    const all = Array.from(c) as HTMLElement[];
    all.forEach(lockExcept(eventId));
};

// --------------------------------------------------------------------------

const lockAllEvents = () => {
    const c = document.getElementsByClassName(EVENT_CLASSNAME);
    const all = Array.from(c) as HTMLElement[];
    all.forEach(lock);
};

const unlockAllEvents = () => {
    const c = document.getElementsByClassName(EVENT_CLASSNAME);
    const all = Array.from(c) as HTMLElement[];
    all.forEach(unlock);
};

// --------------------------------------------------------------------------

const GHOST_ID = "PPCalendar-EventGhost";

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
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        // Ghost-specific styles
        opacity: 0.4,
        pointerEvents: "none",
        userSelect: "none",
    };

    return style;
};

const addGhost = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Create ghost style
    const ghostStyle = createGhost(el);

    // Create a new div element
    const ghostElement = document.createElement("div");

    ghostElement.id = GHOST_ID;

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

const removeGhost = () => {
    const el = document.getElementById(GHOST_ID);
    if (!el) return;
    el.remove();
};

export {
    lockAllEventsExcept,
    lockAllEvents,
    unlockAllEvents,
    // ...
    addGhost,
    removeGhost,
};
