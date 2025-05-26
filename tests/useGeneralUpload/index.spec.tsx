import { expect, MountResult, test } from "@playwright/experimental-ct-react";
import { UPLOAD_BTN_ID, VALUE_ID, INPUT_ID } from "./index.comp";
import Tester from "./index.comp";
import path from "path";
import injectFiles from "../_util/injectFiles";
import { IUploadResult } from "../../src/ui/useGeneralUploader/types";

const OFFLINE = {
    offline: true,
    downloadThroughput: 0,
    uploadThroughput: 0,
    latency: 0,
};

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

/**
 * Successfully upload two image files
 */
test("Upload", async ({ mount }) => {
    const component = await mount(<Tester mockUrl={mockUrl0} />);

    await injectFiles(component, INPUT_ID, FILES);

    await component.getByTestId(UPLOAD_BTN_ID).click();

    const parsed = await getResult(component);

    expect(parsed.success).toBe(true);
});

/**
 * Catch a client disconnect during upload (e.g. when internet access is lost)
 */
test("Disconnect", async ({ mount, context, page }) => {
    test.setTimeout(DELAY);

    const cdpSession = await context.newCDPSession(page);

    const component = await mount(<Tester mockUrl={mockUrl1} />);

    await injectFiles(component, INPUT_ID, FILES);

    // Click Upload Button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Trigger disconnect
    await cdpSession.send("Network.emulateNetworkConditions", OFFLINE);

    const parsed = await getResult(component);

    expect(parsed.success).toBe(false);
    expect(parsed.report.addFails.length).toBe(0);
    expect(parsed.report.uploadFails.length).toBeGreaterThan(0); // at least one fail (e.g. on very fast connection)

    // TODO: ... fix this
    // expect(parsed.report.uploaded.length).toBe(0);
});
