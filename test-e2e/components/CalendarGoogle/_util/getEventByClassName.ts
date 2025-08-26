import { Locator } from "@playwright/test";

/**
 * Finds an event element within a cell by searching for a specific className
 */
const getEventByClassName = async (
    cell: Locator,
    className: string,
    timeout?: number
): Promise<Locator> => {
    const event = cell.locator(`.${className}`).first();
    await event.waitFor({ state: "visible", timeout });
    return event;
};

export default getEventByClassName;
