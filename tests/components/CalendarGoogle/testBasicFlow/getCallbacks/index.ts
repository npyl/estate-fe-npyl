import { Page } from "@playwright/test";
import expectPopoverOpen from "./popover/expectOpen";
import expectGhostOpen from "./ghost/expectOpen";
import expectGhostClosed from "./ghost/expectClosed";

const getCallbacks = (page: Page, eventId: string) => {
    const onStart = async () => {
        await expectGhostOpen(page, eventId);
        await expectPopoverOpen(page, eventId);
    };
    const onEnd = async () => {
        await expectGhostClosed(page, eventId);
        await expectPopoverOpen(page, eventId);
    };

    return { onStart, onEnd };
};

export default getCallbacks;
