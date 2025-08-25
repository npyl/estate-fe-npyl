import { Page } from "@playwright/test";
import { getGhostTestId } from "../../../../../../src/components/Calendar/Event/Main/WithGhost/util";

const expectGhostOpen = async (page: Page, eventId: string) => {
    const GHOST_ID = getGhostTestId(eventId);
    await page
        .getByTestId(GHOST_ID)
        .waitFor({ state: "visible", timeout: 2 * 60 * 1000 });
};

export default expectGhostOpen;
