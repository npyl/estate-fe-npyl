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
} from "./uploadWithProgress.comp";
import Tester from "./uploadWithProgress.comp";
import path from "path";
import expectValue from "../_util/expectValue";

const FILE = path.join(__dirname, "imgs", "img0.png");

test("Upload w/ Percentage", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // wait for filechooser
    const fileChooserPromise = page.waitForEvent("filechooser");
    await component.getByTestId(INPUT_ID).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(FILE);

    // Now click upload button
    await component.getByTestId(UPLOAD_BTN_ID).click();

    // Percentage checks (uncomment when ready)
    await expectValue(component, PERCENTAGE_10_ID, PERCENTAGE_10_VALUE);
    await expectValue(component, PERCENTAGE_30_ID, PERCENTAGE_30_VALUE);
    await expectValue(component, PERCENTAGE_90_ID, PERCENTAGE_90_VALUE);

    // Upload Result
    await expectValue(component, VALUE_ID, SUCCESS_RES);
});
