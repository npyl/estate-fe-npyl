import test, { Page } from "@playwright/test";
import gotoSafe from "../_util/gotoSafe";
import { TASK } from "../../src/constants/tests";
import uuidv4 from "../../src/utils/uuidv4";
import _fillAndExpect from "../_util/fillAndExpect";
import { ICreateOrUpdateTaskReq } from "../../src/types/tasks";
import clickOptions from "../_util/select/clickOptions";
import { getOptionTestId } from "../../src/components/hook-form/Select/constants";
import getBoard from "../_service/getBoard";

// --------------------------------------------------------------------------------

const DEEPER = true;

const fillAndExpect = (page: Page, FIELD_ID: string, value: string) =>
    _fillAndExpect(page, FIELD_ID, value, DEEPER);

// --------------------------------------------------------------------------------

const fillAndExpectTitle = async (page: Page) => {
    const title = uuidv4();
    await fillAndExpect(page, TASK.TITLE_ID, title);
    return title;
};

// --------------------------------------------------------------------------------

const getColumnSelectFirstOption = async (page: Page) => {
    const board = await getBoard(page);
    const columnId = board?.columns?.at(0)?.id ?? -1;
    if (columnId === -1) throw "Bad columnId";
    return columnId.toString();
};

const selectColumn = async (page: Page) => {
    const key = await getColumnSelectFirstOption(page);
    const OPTION_ID = getOptionTestId(key);
    await clickOptions(page, TASK.COLUMN_ID, [OPTION_ID]);
    return key;
};

// --------------------------------------------------------------------------------

const submitAndInterceptRequest = async (page: Page) => {
    const [request] = await Promise.all([
        page.waitForRequest(
            (req) =>
                req.url().includes("/api/google") && req.method() === "POST"
        ),

        page.getByTestId(TASK.SUBMIT_ID).click(),
    ]);

    return request.postDataJSON() as ICreateOrUpdateTaskReq;
};

// --------------------------------------------------------------------------------

const DELAY = 2 * 60 * 1000;

test("create", async ({ page }) => {
    await gotoSafe(page, "http://127.0.0.1:3000/tasks");

    await page.getByTestId(TASK.CREATE_ID).click();

    await page
        .getByTestId(TASK.DIALOG_ID)
        .waitFor({ state: "visible", timeout: DELAY });

    // Column
    const columnId = await selectColumn(page);

    // Title
    const title = await fillAndExpectTitle(page);

    // Assignee

    // Submit
    const request = await submitAndInterceptRequest(page);
    expect(request.columnId).toBe(columnId);
    expect(request.name).toBe(title);
});
