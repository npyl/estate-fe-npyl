import { Locator, Page } from "@playwright/test";

/**
 * Click outside of the event but take care not to click on the open popover (on the right)
 * @param page
 * @param event
 */
const clickOutside = async (page: Page, event: Locator) => {
    const eventBox = await event.boundingBox();
    if (!eventBox) throw "Could not get event bounding box";

    const clickX = eventBox.x - 100;
    const clickY = eventBox.y + eventBox.height + 100;

    await page.mouse.click(clickX, clickY);
};

export default clickOutside;
