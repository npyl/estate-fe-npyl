import { Page } from "@playwright/test";
import { getPopoverTestId } from "../../../../../../src/sections/Calendar/Event/Popover/constants";

const expectPopoverOpen = async (page: Page, eventId: string) => {
    const POPOVER_ID = getPopoverTestId(eventId);
    await page
        .getByTestId(POPOVER_ID)
        .waitFor({ state: "attached", timeout: 2 * 60 * 1000 });
};

export default expectPopoverOpen;
