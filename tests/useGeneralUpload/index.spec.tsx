import { expect, MountResult, test } from "@playwright/experimental-ct-react";
import {
    UPLOAD_BTN_ID,
    VALUE_ID,
    INPUT_ID,
    RECONNECT_ID,
    FILES_COUNT_ID,
    RECONNECT_VALUE,
} from "./index.comp";
import Tester from "./index.comp";
import path from "path";
import injectFiles from "../_util/injectFiles";
import { IUploadResult } from "../../src/ui/useGeneralUploader/types";
import { POLLING } from "../../src/ui/useGeneralUploader/useUploadWithProgress";
import getNetworkControl from "./_util/getNetworkControl";
import getCDPNetworkControl from "../_util/network/getControl";
import expectValue from "../_util/expectValue";

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
test("Disconnect", async ({ mount, context, page }) => {
    test.setTimeout(DELAY);

    // -------------------------------------------------------------------

    const [intervals, onIntervalChange] = getIntervalsStore();

    const component = await mount(
        <Tester mockUrl={mockUrl1} onIntervalChange={onIntervalChange} />
    );

    // -------------------------------------------------------------------

    const { go2G, reset } = await getCDPNetworkControl(context, page);
    const { goOffline, goOnline } = await getNetworkControl(page);

    // -------------------------------------------------------------------

    // Inject & Start upload (NOTE: first introduce throtthling so that the files do not get "uploaded" really quick!)
    await go2G();
    await injectFiles(component, INPUT_ID, FILES);
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Going offline (+ wait for download to actually start...)
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

    await reset();
    goOnline();
});

/**
 * Test with extended timing to see if useNetworkAccess eventually detects reconnection
 */
test("Reconnect", async ({ mount, context, page }) => {
    test.setTimeout(DELAY * 4); // Even longer timeout

    // -------------------------------------------------------------------

    const [intervals, onIntervalChange] = getIntervalsStore();

    const component = await mount(
        <Tester mockUrl={mockUrl1} onIntervalChange={onIntervalChange} />
    );

    // -------------------------------------------------------------------

    const { go2G, reset } = await getCDPNetworkControl(context, page);
    const { goOffline, goOnline } = await getNetworkControl(page);

    // -------------------------------------------------------------------

    // Inject & Start upload (NOTE: first introduce throtthling so that the files do not get "uploaded" really quick!)
    await go2G();
    await injectFiles(component, INPUT_ID, FILES);
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Going offline (+ wait for download to actually start...)
    await page.waitForTimeout(500);
    console.log("Going offline...");
    goOffline();

    await page.waitForTimeout(3000);

    await component
        .getByTestId(VALUE_ID)
        .waitFor({ state: "visible", timeout: DELAY });

    // Going online
    console.log("Going back online...");
    await reset();
    goOnline();

    await page.waitForTimeout(30 * 1000);

    await expectValue(component, RECONNECT_ID, RECONNECT_VALUE);
    await expectValue(component, FILES_COUNT_ID, "0");

    expect(intervals.length).toBe(3);
    expect(intervals[0]).toBe(POLLING.RAPID);
    expect(intervals[1]).toBe(POLLING.DEFAULT);
    expect(intervals[2]).toBe(POLLING.DISABLED);
});
