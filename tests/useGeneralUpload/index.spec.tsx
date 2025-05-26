import { test } from "@playwright/experimental-ct-react";
import { SUCCESS_RES, UPLOAD_BTN_ID, VALUE_ID, INPUT_ID } from "./index.comp";
import Tester from "./index.comp";
import path from "path";
import injectFiles from "../_util/injectFiles";
import expectValue from "../_util/expectValue";

const FILES = [
    path.join(__dirname, "imgs", "img0.png"),
    path.join(__dirname, "imgs", "img1.png"),
];

// ------------------------------------------------------------------------------

/**
 * Successfully upload an image file and track progress (%)
 */
test("Upload w/ Percentage", async ({ mount }) => {
    const component = await mount(<Tester />);

    await injectFiles(component, INPUT_ID, FILES);

    // Now click upload button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Upload Result
    await expectValue(component, VALUE_ID, SUCCESS_RES);
});
