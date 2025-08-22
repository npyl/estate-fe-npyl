import { Page } from "@playwright/test";
import expectPopoverOpen from "./popover/expectOpen";

const getCallbacks = (page: Page, eventId: string, isCreate: boolean) => {
    const onStart = async () => {
        // if (!isCreate) await expectGhostOpen(page, eventId);
        await expectPopoverOpen(page, eventId);
    };
    const onEnd = async () => {
        // if (!isCreate) await expectGhostClosed(page, eventId);
        await expectPopoverOpen(page, eventId);
    };

    return { onStart, onEnd };
};

export default getCallbacks;
