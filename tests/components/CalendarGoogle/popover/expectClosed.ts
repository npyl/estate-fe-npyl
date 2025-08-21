import { Page } from "@playwright/test";
import { getPopoverId } from "../../../../src/sections/Calendar/Event/Popover/constants";

const expectPopoverClosed = async (page: Page, eventId: string) => {
    const POPOVER_ID = getPopoverId(eventId);
    await page
        .getByTestId(POPOVER_ID)
        .waitFor({ state: "detached", timeout: 2 * 60 * 1000 });
};

export default expectPopoverClosed;
