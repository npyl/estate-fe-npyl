import { Page } from "@playwright/test";

interface Position {
    x: number;
    y: number;
}

interface IDragCallbacks {
    onStart?: () => Promise<void>;
    onEnd?: () => Promise<void>;
}

const drag = async (
    page: Page,
    initial: Position,
    final: Position,
    callbacks?: IDragCallbacks
) => {
    const { onStart, onEnd } = callbacks || {};

    await page.mouse.move(initial.x, initial.y);
    await page.mouse.down();
    await onStart?.();
    await page.mouse.move(final.x, final.y);
    await page.mouse.up();
    await onEnd?.();
};

export default drag;
