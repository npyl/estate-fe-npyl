import { test } from "@playwright/experimental-ct-react";
import {
    SUCCESS_RES,
    UPLOAD_BTN_ID,
    VALUE_ID,
    INPUT_ID,
    // ...
    PERCENTAGE_10_ID,
    PERCENTAGE_10_VALUE,
    PERCENTAGE_30_ID,
    PERCENTAGE_30_VALUE,
    PERCENTAGE_90_ID,
    PERCENTAGE_90_VALUE,
} from "./index.comp";
import Tester from "./index.comp";
import path from "path";
import injectFiles from "../../_util/injectFiles";
import expectValue from "../../_util/expectValue";
import {
    ERROR_RESPONSE,
    ERROR_ABORT,
} from "../../../src/ui/useGeneralUploader/useUploadWithProgress";
import getNetworkControl from "../_util/getNetworkControl";

const FILE = path.join(__dirname, "..", "imgs", "img0.png");

const DELAY = 1000 * 60 * 2; // 2mins (in ms)

const mockUrl0 = "http://127.0.0.1:3000/api/__test__/uploadFile";
const mockUrl1 = `${mockUrl0}?slow=${DELAY}`;
const mockUrl2 = `${mockUrl0}?shouldFail=1`;

// ------------------------------------------------------------------------------

/**
 * Successfully upload an image file and track progress (%)
 */
test("Upload w/ Percentage", async ({ mount }) => {
    const component = await mount(<Tester mockUrl={mockUrl0} />);

    await injectFiles(component, INPUT_ID, [FILE]);

    // Now click upload button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Percentage checks (uncomment when ready)
    await expectValue(component, PERCENTAGE_10_ID, PERCENTAGE_10_VALUE);
    await expectValue(component, PERCENTAGE_30_ID, PERCENTAGE_30_VALUE);
    await expectValue(component, PERCENTAGE_90_ID, PERCENTAGE_90_VALUE);

    // Upload Result
    await expectValue(component, VALUE_ID, SUCCESS_RES);
});

/**
 * Catch a client disconnect during upload (e.g. when internet access is lost)
 */
test("Disconnect", async ({ mount, page }) => {
    test.setTimeout(DELAY * 2);

    const { goOffline, goOnline } = await getNetworkControl(page);

    const component = await mount(<Tester mockUrl={mockUrl1} />);

    await injectFiles(component, INPUT_ID, [FILE]);

    // Click Upload Button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Wait until >=10%
    await expectValue(component, PERCENTAGE_10_ID, PERCENTAGE_10_VALUE, DELAY);

    goOffline();

    // Upload Result
    await expectValue(component, VALUE_ID, ERROR_ABORT, DELAY);

    goOnline();
});

/**
 * Catch an upload fail
 * This could mean the server rejected the request, e.g. on a timeout
 */
test("Upload Fail", async ({ mount }) => {
    const component = await mount(<Tester mockUrl={mockUrl2} />);

    await injectFiles(component, INPUT_ID, [FILE]);

    // Click Upload Button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Upload Result
    await expectValue(component, VALUE_ID, ERROR_RESPONSE);
});
