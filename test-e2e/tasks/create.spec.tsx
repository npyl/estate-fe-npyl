import { test, expect } from "@playwright/test";
import { createEvent } from "./service/create";
import { WITH_CALENDAR_SWITCH_TESTID } from "../../src/sections/Tasks/card/CardDialog/Content/_WithCalendar/Section/WithCalendarSwitch/constants";
import { ALL_DAY_CHECKBOX_TESTID } from "../../src/sections/Calendar/Event/form/Content/RHFEventDates/EventDates/constants";

test.describe("create", () => {
    test("Simple", async ({ page }) => {
        const [request, { columnId, title, assigneeId }] =
            await createEvent(page);

        expect(request.columnId.toString()).toBe(columnId);
        expect(request.name).toBe(title);
        expect(request.userIds?.at(0)).toBe(assigneeId);
    });

    test("w/ Calendar (default dates)", async ({ page }) => {
        const onBeforeSubmit = async () => {
            // 1. click calendar switch
            page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();
        };

        const [request, { columnId, title, assigneeId }] = await createEvent(
            page,
            onBeforeSubmit
        );
    });

    test("w/ Calendar (all day)", async ({ page }) => {
        const onBeforeSubmit = async () => {
            // 1. click calendar switch
            page.getByTestId(WITH_CALENDAR_SWITCH_TESTID).click();

            // 2. click all day
            page.getByTestId(ALL_DAY_CHECKBOX_TESTID).click();
        };

        const [request, { columnId, title, assigneeId }] = await createEvent(
            page,
            onBeforeSubmit
        );
    });
});
