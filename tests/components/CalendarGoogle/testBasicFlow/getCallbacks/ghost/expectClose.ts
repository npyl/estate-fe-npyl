import { Page } from "@playwright/test";
import { getGhostId } from "../../../../../../src/components/Calendar/Event/Main/WithGhost/util";

const expectGhostClosed = async (page: Page, eventId: string) => {
    const GHOST_ID = getGhostId(eventId);
    console.log("Checking ghost closed!");
    await page
        .getByTestId(GHOST_ID)
        .waitFor({ state: "detached", timeout: 2 * 60 * 1000 });
};

export default expectGhostClosed;
