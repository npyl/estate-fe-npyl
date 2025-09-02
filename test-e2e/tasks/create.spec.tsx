import test, { Browser, chromium, Page } from "@playwright/test";
import gotoSafe from "../_util/gotoSafe";
import { TASK } from "../../src/constants/tests";
import uuidv4 from "../../src/utils/uuidv4";
import _fillAndExpect from "../_util/fillAndExpect";
import { ICreateOrUpdateTaskReq } from "../../src/types/tasks";
import clickSelectOptions from "../_util/select/clickOptions";
import clickAutocompleteOptions from "../_util/autocomplete/clickOptions";
import { getOptionTestId } from "../../src/components/hook-form/Select/constants";
import getBoard from "../_service/getBoard";
import getAllUsers from "../_service/getAllUsers";

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

const NO_CHAINING = false;

const selectColumn = async (page: Page) => {
    const key = await getColumnSelectFirstOption(page);
    const OPTION_ID = getOptionTestId(key);
    await clickSelectOptions(page, TASK.COLUMN_ID, [OPTION_ID], NO_CHAINING);
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

const getAssigneeSelectFirstOption = async (page: Page) => {
    const users = await getAllUsers(page);
    const assigneeId = users?.at(0)?.id ?? -1;
    if (assigneeId === -1) throw "Bad assigneeId";
    return assigneeId.toString();
};

const selectAssignee = async (page: Page) => {
    const key = await getAssigneeSelectFirstOption(page);
    const OPTION_ID = getOptionTestId(key);
    await clickAutocompleteOptions(
        page,
        TASK.ASSIGNEE_ID,
        [OPTION_ID],
        NO_CHAINING
    );
    return key;
};

// --------------------------------------------------------------------------------

const DELAY = 2 * 60 * 1000;

let browser: Browser;
let page: Page;

// INFO: for ever test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await browser?.close();
});

test("create", async () => {
    await gotoSafe(page, "http://127.0.0.1:3000/tasks");

    await page.getByTestId(TASK.CREATE_ID).click();

    await page
        .getByTestId(TASK.DIALOG_ID)
        .waitFor({ state: "visible", timeout: DELAY });

    // Column
    const columnId = await selectColumn(page);
    console.log("COLUMN: ", columnId);

    // Title
    const title = await fillAndExpectTitle(page);

    // Assignee
    const assigneeId = await selectAssignee(page);

    // Submit
    const request = await submitAndInterceptRequest(page);
    expect(request.columnId).toBe(columnId);
    expect(request.name).toBe(title);
    expect(request.userIds?.at(0)).toBe(assigneeId);
});
