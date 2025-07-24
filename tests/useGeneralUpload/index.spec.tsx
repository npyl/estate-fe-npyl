import { expect, MountResult, test } from "@playwright/experimental-ct-react";
import { UPLOAD_BTN_ID, VALUE_ID, INPUT_ID, RECONNECT_ID } from "./index.comp";
import Tester from "./index.comp";
import path from "path";
import injectFiles from "../_util/injectFiles";
import { IUploadResult } from "../../src/ui/useGeneralUploader/types";
import { POLLING } from "../../src/ui/useGeneralUploader/useUploadWithProgress";
import getNetworkControl from "./_util/getNetworkControl";

const DELAY = 1000 * 60 * 2; // 2mins (in ms)

const mockUrl0 = "http://127.0.0.1:3000/api/__test__/uploadFile";
const mockUrl1 = `${mockUrl0}?slow=${DELAY}`;

const FILES = [
    path.join(__dirname, "imgs", "img0.png"),
    path.join(__dirname, "imgs", "img1.png"),
];

// ---------------------------------------------------------------------------------------

const getResult = async (component: MountResult): Promise<IUploadResult> => {
    // IMPORTANT: wait for value element to appear (which means there is actually a value; a.k.a. upload() has finished)
    await component
        .getByTestId(VALUE_ID)
        .waitFor({ state: "visible", timeout: DELAY });

    const value = await component.getByTestId(VALUE_ID).textContent();

    if (!value)
        return {
            success: false,
            report: { addFails: [], uploaded: [], uploadFails: [] },
        };

    try {
        return JSON.parse(value) as IUploadResult;
    } catch (ex) {
        return {
            success: false,
            report: { addFails: [], uploaded: [], uploadFails: [] },
        };
    }
};

// ------------------------------------------------------------------------------

const getIntervalsStore = () => {
    const intervals: number[] = [];
    const onIntervalChange = (i: number) => intervals.push(i);
    return [intervals, onIntervalChange] as const;
};

/**
 * Successfully upload two image files
 */
test("Upload", async ({ mount }) => {
    const [intervals, onIntervalChange] = getIntervalsStore();

    const component = await mount(
        <Tester mockUrl={mockUrl0} onIntervalChange={onIntervalChange} />
    );

    await injectFiles(component, INPUT_ID, FILES);

    await component.getByTestId(UPLOAD_BTN_ID).click();

    const parsed = await getResult(component);

    expect(parsed.success).toBe(true);

    expect(intervals.length).toBe(2);
    expect(intervals[0]).toBe(POLLING.RAPID);
    expect(intervals[1]).toBe(POLLING.DISABLED);
});

/**
 * Catch a client disconnect during upload (e.g. when internet access is lost)
 */
test("Disconnect", async ({ mount, page }) => {
    test.setTimeout(DELAY);

    // -------------------------------------------------------------------

    const [intervals, onIntervalChange] = getIntervalsStore();

    const component = await mount(
        <Tester mockUrl={mockUrl1} onIntervalChange={onIntervalChange} />
    );

    // -------------------------------------------------------------------

    const { goOffline, goOnline } = await getNetworkControl(page);

    await injectFiles(component, INPUT_ID, FILES);

    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Wait a bit for upload to actually start
    await page.waitForTimeout(500);

    goOffline();

    const parsed = await getResult(component);

    expect(parsed.success).toBe(false);
    expect(parsed.report.addFails.length).toBe(0);
    expect(parsed.report.uploadFails.length).toBeGreaterThan(0);
    expect(parsed.report.uploaded.length).toBe(0);

    expect(intervals.length).toBe(2);
    expect(intervals[0]).toBe(POLLING.RAPID);
    expect(intervals[1]).toBe(POLLING.DEFAULT);

    goOnline();
});

/**
 * Test with extended timing to see if useNetworkAccess eventually detects reconnection
 */
test("Reconnect - Extended Timing", async ({ mount, page }) => {
    const [intervals, onIntervalChange] = getIntervalsStore();

    test.setTimeout(DELAY * 4); // Even longer timeout

    const { goOffline, goOnline } = await getNetworkControl(page);

    const component = await mount(
        <Tester mockUrl={mockUrl1} onIntervalChange={onIntervalChange} />
    );

    await injectFiles(component, INPUT_ID, FILES);

    console.log("Starting upload...");
    await component.getByTestId(UPLOAD_BTN_ID).click();
    await page.waitForTimeout(1500);

    console.log(`Intervals after upload start: ${intervals.join(", ")}`);

    console.log("Going offline...");
    goOffline();

    await page.waitForTimeout(3000);
    console.log(`Intervals after going offline: ${intervals.join(", ")}`);

    await component
        .getByTestId(VALUE_ID)
        .waitFor({ state: "visible", timeout: DELAY });

    console.log("Going back online...");
    goOnline();

    console.log(
        "Network is back to normal, now waiting for useNetworkAccess to detect..."
    );

    // Wait for multiple polling cycles (30sec DEFAULT polling)
    // Let's wait for 2 full cycles to be sure
    for (let i = 0; i < 6; i++) {
        await page.waitForTimeout(10000); // Wait 10 seconds at a time
        console.log(
            `After ${(i + 1) * 10} seconds online: intervals = ${intervals.join(", ")}`
        );

        // Check if reconnect was detected
        const reconnectVisible = await component
            .getByTestId(RECONNECT_ID)
            .isVisible()
            .catch(() => false);
        if (reconnectVisible) {
            console.log(`Reconnect detected after ${(i + 1) * 10} seconds!`);
            break;
        }
    }

    console.log(`Final intervals after extended wait: ${intervals.join(", ")}`);

    // This should eventually work if it's just a timing issue
    await component
        .getByTestId(RECONNECT_ID)
        .waitFor({ state: "visible", timeout: 5000 });

    expect(intervals.length).toBe(3);
    expect(intervals[2]).toBe(POLLING.DISABLED);
});
