const GHOST_CLASSNAME = "PPCalendar-EventGhost";

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

const removeGhost = (el: Element) => el.remove();

// ---------------------------------------------------------------------

const addGhost = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Create ghost style
    const ghostStyle = createGhost(el);

    // Create a new div element
    const ghostElement = document.createElement("div");

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

export { addGhost, removeGhosts };
