import { Page } from "@playwright/test";
import expectPopoverOpen from "./popover/expectOpen";
import expectGhostOpen from "./ghost/expectOpen";
import expectGhostClosed from "./ghost/expectClosed";

interface IDragCallbacks {
    onBeforeStart?: () => Promise<void>;
    onStart?: () => Promise<void>;
    onEnd?: () => Promise<void>;
}

const getCallbacks = (page: Page, eventId: string): IDragCallbacks => {
    const onBeforeStart = async () => {
        await expectPopoverOpen(page, eventId);
    };
    const onStart = async () => {
        await expectGhostOpen(page, eventId);
    };
    const onEnd = async () => {
        await expectGhostClosed(page, eventId);
        await expectPopoverOpen(page, eventId);
    };

    return { onBeforeStart, onStart, onEnd };
};

export type { IDragCallbacks };
export default getCallbacks;
