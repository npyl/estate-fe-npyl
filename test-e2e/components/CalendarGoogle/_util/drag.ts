import { Page } from "@playwright/test";
import { IDragCallbacks } from "../testBasicFlow/getCallbacks";

interface Position {
    x: number;
    y: number;
}

const drag = async (
    page: Page,
    initial: Position,
    final: Position,
    callbacks?: IDragCallbacks
) => {
    const { onBeforeStart, onStart, onEnd } = callbacks || {};

    await onBeforeStart?.();
    await page.mouse.move(initial.x, initial.y);
    await page.mouse.down();
    await onStart?.();
    await page.mouse.move(final.x, final.y);
    await page.mouse.up();
    await onEnd?.();
};

export default drag;
