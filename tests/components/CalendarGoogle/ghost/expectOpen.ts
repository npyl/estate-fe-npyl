import { Page } from "@playwright/test";
import { getGhostId } from "../../../../src/components/Calendar/Event/Main/WithGhost/util";

const expectGhostOpen = async (page: Page, eventId: string) => {
    const GHOST_ID = getGhostId(eventId);
    console.log("Checking ghost open!");
    await page
        .getByTestId(GHOST_ID)
        .waitFor({ state: "attached", timeout: 2 * 60 * 1000 });
};

export default expectGhostOpen;
