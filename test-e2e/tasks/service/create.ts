import { Page, expect } from "@playwright/test";
import gotoSafe from "../../_util/gotoSafe";
import { TASK } from "../../../src/constants/tests";
import uuidv4 from "../../../src/utils/uuidv4";
import _fillAndExpect from "../../_util/fillAndExpect";
import { ICreateOrUpdateTaskReq } from "../../../src/types/tasks";
import clickSelectOptions from "../../_util/select/clickOptions";
import clickAutocompleteOptions from "../../_util/autocomplete/clickOptions";
import { getOptionTestId as getSelectOptionTestId } from "../../../src/components/hook-form/Select/constants";
import { getOptionTestId as getAutocompleteOptionTestId } from "../../../src/ui/Autocompletes/Manager/constant";
import getBoard from "../../_service/getBoard";
import getProfile from "../../_service/getProfile";

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
    const OPTION_ID = getSelectOptionTestId(key);
    await clickSelectOptions(page, TASK.COLUMN_ID, [OPTION_ID], NO_CHAINING);
    return key;
};

// --------------------------------------------------------------------------------

const getAssigneeSelectFirstOption = async (page: Page) => {
    const user = await getProfile(page);
    const assigneeId = user?.id ?? -1;
    if (assigneeId === -1) throw "Bad assigneeId";
    return assigneeId;
};

const selectAssignee = async (page: Page) => {
    const key = await getAssigneeSelectFirstOption(page);
    const OPTION_ID = getAutocompleteOptionTestId(key);
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

const createEvent = async (
    page: Page,
    onBeforeSubmit?: () => Promise<void>
) => {
    let requestData: ICreateOrUpdateTaskReq | null = null;

    page.on("request", (req) => {
        if (req.url().includes("/api/tasks") && req.method() === "POST") {
            requestData = req.postDataJSON() as ICreateOrUpdateTaskReq;
        }
    });

    await gotoSafe(page, "http://127.0.0.1:3000/tasks");

    // INFO: click Fab
    await page.getByTestId(TASK.CREATE_ID).first().click();

    await page
        .getByTestId(TASK.DIALOG_ID)
        .waitFor({ state: "visible", timeout: DELAY });

    // Column
    const columnId = await selectColumn(page);

    // Title
    const title = await fillAndExpectTitle(page);

    // Assignee
    const assigneeId = await selectAssignee(page);

    // Before Submit
    await onBeforeSubmit?.();

    // Submit
    await page.getByTestId(TASK.SUBMIT_ID).click();

    expect(requestData).not.toBe(null);

    return [requestData!, { columnId, title, assigneeId }] as const;
};

export { createEvent };
