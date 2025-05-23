import { test } from "@playwright/test";
import path from "path";
import {
    UPLOAD_BTN_TESTID,
    VALUE_TESTID,
    SUCCESS_RES,
} from "../../src/pages/__test__/fileUpload/index.page";

const baseUrl = "http://127.0.0.1:3000/__test__/fileUpload";

const FILES = [
    path.join(__dirname, "imgs", "img0.png"),
    path.join(__dirname, "imgs", "img1.png"),
];

const TWO_MINUTES = 2 * 60 * 60 * 1000;
const TEN_MINUTES = 5 * TWO_MINUTES;

test.setTimeout(TEN_MINUTES);

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
});

test("upload2", async ({ page }) => {
    console.log("FILES: ", FILES);

    // INFO: this can take a bit of time because it waits for property create & component rerender
    await page.waitForSelector('input[type="file"]', { timeout: TWO_MINUTES });

    await page.setInputFiles('input[type="file"]', FILES);

    await page.getByTestId(UPLOAD_BTN_TESTID).click();
});
