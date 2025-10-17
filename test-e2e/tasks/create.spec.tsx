import { test, expect } from "@playwright/test";
import { createEvent } from "./service/create";
import { WITH_CALENDAR_SWITCH_TESTID } from "../../src/sections/Tasks/card/CardDialog/Content/_WithCalendar/Section/WithCalendarSwitch/constants";
import { ALL_DAY_CHECKBOX_TESTID } from "../../src/sections/Calendar/Event/form/Content/RHFEventDates/EventDates/constants";
import { ICreateOrUpdateTaskReq } from "../../src/types/tasks";
import { START_HOUR, END_HOUR } from "../../src/constants/calendar";

// --------------------------------------------------------------------------------------------

const expectHours = (
    request: ICreateOrUpdateTaskReq,
    startHour: number,
    endHour: number
) => {
    const due0 = request.due?.at(0);
    const due1 = request.due?.at(1);

    const startDate = due0 ? new Date(due0) : undefined;
    const endDate = due1 ? new Date(due1) : undefined;

    expect(startDate?.getHours()).toBe(startHour);
    expect(endDate?.getHours()).toBe(endHour);
};

// --------------------------------------------------------------------------------------------

test.describe("create", () => {
    test.setTimeout(2 * 60 * 1000);

    test("Simple", async ({ page }) => {
        const [request, { columnId, title, assigneeId }] =
            await createEvent(page);

        expect(request.columnId.toString()).toBe(columnId);
        expect(request.name).toBe(title);
        expect(request.userIds?.at(0)).toBe(assigneeId);
    });

    test.describe("w/ Calendar Flows", () => {
        test("default dates", async ({ page }) => {
            let currentHour = -1;

            const onBeforeSubmit = async () => {
                // 1. click calendar switch
                await page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();

                // 2. before submitting, note down the hour we set the <RHFEventDates /> (by default value)
                currentHour = new Date().getHours();
            };

            const [request] = await createEvent(page, onBeforeSubmit);

            expectHours(request, currentHour, currentHour + 1);
        });

        test("default dates -> all day", async ({ page }) => {
            const onBeforeSubmit = async () => {
                // 1. click calendar switch
                await page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();

                // 2. click all day checkbox (all day ON)
                await page.getByTestId(ALL_DAY_CHECKBOX_TESTID).click();
            };

            const [request] = await createEvent(page, onBeforeSubmit);

            expectHours(request, START_HOUR, END_HOUR);
        });

        test("default dates -> all day -> default dates", async ({ page }) => {
            const onBeforeSubmit = async () => {
                // 1. click calendar switch
                await page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();

                // 2. click all day checkbox (all day ON)
                await page.getByTestId(ALL_DAY_CHECKBOX_TESTID).click();

                // 3. re-click all day checkbox (all day OFF)
                await page.getByTestId(ALL_DAY_CHECKBOX_TESTID).click();
            };

            const [request] = await createEvent(page, onBeforeSubmit);

            expectHours(request, START_HOUR, START_HOUR + 1);
        });
    });
});
