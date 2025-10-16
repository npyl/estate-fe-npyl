import { test, expect } from "@playwright/test";
import { createEvent } from "./service/create";
import { WITH_CALENDAR_SWITCH_TESTID } from "../../src/sections/Tasks/card/CardDialog/Content/_WithCalendar/Section/WithCalendarSwitch/constants";
import { ALL_DAY_CHECKBOX_TESTID } from "../../src/sections/Calendar/Event/form/Content/RHFEventDates/EventDates/constants";
import { ICreateOrUpdateTaskReq } from "../../src/types/tasks";
import { START_HOUR, END_HOUR } from "../../src/constants/calendar";

// --------------------------------------------------------------------------------------------

const expectHours = (
    response: ICreateOrUpdateTaskReq,
    startHour: number,
    endHour: number
) => {
    const due0 = response.due?.at(0);
    const due1 = response.due?.at(1);

    const startDate = due0 ? new Date(due0) : undefined;
    const endDate = due1 ? new Date(due1) : undefined;

    expect(startDate?.getHours()).toBe(startHour);
    expect(endDate?.getHours()).toBe(endHour);
};

// --------------------------------------------------------------------------------------------

test.describe("create", () => {
    test("Simple", async ({ page }) => {
        const [response, { columnId, title, assigneeId }] =
            await createEvent(page);

        expect(response.columnId.toString()).toBe(columnId);
        expect(response.name).toBe(title);
        expect(response.userIds?.at(0)).toBe(assigneeId);
    });

    test.describe("w/ Calendar", () => {
        test("default dates", async ({ page }) => {
            let currentHour = -1;

            const onBeforeSubmit = async () => {
                // 1. click calendar switch
                await page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();

                // 2. before submitting, note down the hour we set the <RHFEventDates /> (by default value)
                currentHour = new Date().getHours();
            };

            const [response] = await createEvent(page, onBeforeSubmit);

            expectHours(response, currentHour, currentHour + 1);
        });

        test("all day", async ({ page }) => {
            const onBeforeSubmit = async () => {
                // 1. click calendar switch
                await page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();

                // 2. click all day checkbox
                await page.getByTestId(ALL_DAY_CHECKBOX_TESTID).click();
            };

            const [response] = await createEvent(page, onBeforeSubmit);

            expectHours(response, START_HOUR, END_HOUR);
        });
    });
});
