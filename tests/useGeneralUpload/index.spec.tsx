import { test } from "@playwright/experimental-ct-react";
import { SUCCESS_RES, UPLOAD_BTN_ID, VALUE_ID, INPUT_ID } from "./index.comp";
import Tester from "./index.comp";
import path from "path";
import injectFiles from "../_util/injectFiles";
import expectValue from "../_util/expectValue";

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

// ------------------------------------------------------------------------------

/**
 * Successfully upload two image files
 */
test("Upload", async ({ mount }) => {
    const component = await mount(<Tester mockUrl={mockUrl0} />);

    await injectFiles(component, INPUT_ID, FILES);

    // Now click upload button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Upload Result
    await expectValue(component, VALUE_ID, SUCCESS_RES);
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
});
