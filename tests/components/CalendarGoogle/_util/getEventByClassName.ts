import { Locator } from "@playwright/test";

/**
 * Finds an event element within a cell by searching for a specific className
 * @param cell - The cell Locator to search within
 * @param className - The className to search for
 * @param options - Optional configuration for the search
 * @returns Promise<Locator> - The event locator found within the cell
 */
const getEventByClassName = async (
    cell: Locator,
    className: string,
    options?: {
        timeout?: number;
        state?: "visible" | "attached" | "detached" | "hidden";
        strict?: boolean;
    }
): Promise<Locator> => {
    const { timeout = 5000, state = "visible", strict = true } = options || {};

    // Search for element with the specific className within the cell
    const event = cell.locator(`.${className}`);

    // Wait for the element to be in the expected state
    await event.waitFor({
        state,
        timeout,
        ...(strict && { strict }),
    });

    return event;
};

export default getEventByClassName;
