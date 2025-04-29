import { test, expect, Page } from "@playwright/test";

const STATE_SELECTOR = '[data-testid="current-state"] pre';

const baseUrl = "http://127.0.0.1:3000/__test__/taskFilters";

const getState = async (page: Page) => {
    const updatedState = await page.textContent(STATE_SELECTOR);
    if (!updatedState) throw "Could not get state";
    return JSON.parse(updatedState);
};

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
});

test("initial", async ({ page }) => {
    const state = await getState(page);
    expect(state.search).toBe("");
    expect(state.labels).toEqual([]);
    expect(state.assigneeId).toBeUndefined();
    expect(state.priority).toBeUndefined();
});

test("search", async ({ page }) => {
    await page.getByTestId("set-search").click();
    const state = await getState(page);
    expect(state.search).toBe("test search");
});

test("assignee", async ({ page }) => {
    await page.getByTestId("set-assignee").click();
    const state = await getState(page);
    expect(state.assigneeId).toBe(123);

    // Test clearing assignee
    await page.getByTestId("clear-assignee").click();
    const updatedState = await getState(page);
    expect(updatedState.assigneeId).toBeUndefined();
});

test("priority", async ({ page }) => {
    await page.getByTestId("set-priority").click();
    const state = await getState(page);
    expect(state.priority).toBe(2);

    // Test clearing priority
    await page.getByTestId("clear-priority").click();
    const updatedState = await getState(page);
    expect(updatedState.priority).toBeUndefined();
});

test("labels", async ({ page }) => {
    // Add first label
    await page.getByTestId("add-label-1").click();
    let state = await getState(page);
    expect(state.labels).toContain(1);

    // Add second label
    await page.getByTestId("add-label-2").click();
    state = await getState(page);
    expect(state.labels).toEqual(expect.arrayContaining([1, 2]));

    // Remove first label
    await page.getByTestId("remove-label-1").click();
    state = await getState(page);
    expect(state.labels).not.toContain(1);
    expect(state.labels).toContain(2);

    // Clear all labels
    await page.getByTestId("clear-labels").click();
    state = await getState(page);
    expect(state.labels).toEqual([]);
});

test("sorting", async ({ page }) => {
    await page.getByTestId("sort-by-created-asc").click();
    let state = await getState(page);
    expect(state.sorting).toEqual({
        sortBy: "createdAt",
        direction: "ASC",
    });

    await page.getByTestId("sort-by-priority-desc").click();
    state = await getState(page);
    expect(state.sorting).toEqual({
        sortBy: "priority",
        direction: "DESC",
    });
});

test("complex", async ({ page }) => {
    // Set search
    await page.getByTestId("set-search").click();

    // Add labels
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("add-label-3").click();

    // Set assignee
    await page.getByTestId("set-assignee").click();

    // Set priority
    await page.getByTestId("set-priority").click();

    // Set sorting
    await page.getByTestId("sort-by-priority-desc").click();

    // Check intermediate state
    let state = await getState(page);
    expect(state.search).toBe("test search");
    expect(state.labels).toEqual(expect.arrayContaining([1, 3]));
    expect(state.assigneeId).toBe(123);
    expect(state.priority).toBe(2);
    expect(state.sorting).toEqual({
        sortBy: "priority",
        direction: "DESC",
    });

    // Remove label 1
    await page.getByTestId("remove-label-1").click();

    // Clear priority
    await page.getByTestId("clear-priority").click();

    // Change sorting
    await page.getByTestId("sort-by-created-asc").click();

    // Check final state
    state = await getState(page);
    expect(state.search).toBe("test search");
    expect(state.labels).toEqual([3]);
    expect(state.assigneeId).toBe(123);
    expect(state.priority).toBeUndefined();
    expect(state.sorting).toEqual({
        sortBy: "createdAt",
        direction: "ASC",
    });
});

test("reset", async ({ page }) => {
    // First set various filters
    await page.getByTestId("set-search").click();
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("set-assignee").click();
    await page.getByTestId("set-priority").click();
    await page.getByTestId("sort-by-priority-desc").click();

    // Verify filters are set
    let state = await getState(page);
    expect(state.search).toBe("test search");
    expect(state.labels).toContain(1);
    expect(state.assigneeId).toBe(123);
    expect(state.priority).toBe(2);

    // Reset all filters
    await page.getByTestId("reset-filters").click();

    // Verify all filters are reset
    state = await getState(page);
    expect(state.search).toBe("");
    expect(state.labels).toEqual([]);
    expect(state.assigneeId).toBeUndefined();
    expect(state.priority).toBeUndefined();
    expect(state.sorting).toBeUndefined();
});

test("URL overrides", async ({ page }) => {
    // Navigate with assignee query param
    await page.goto(`${baseUrl}?assignee=456`);

    const state = await getState(page);
    expect(state.assigneeId).toBe(456);
});

test("complex & validate persistence", async ({ page }) => {
    // Set multiple filters
    await page.getByTestId("set-search").click();
    await page.getByTestId("add-label-2").click();
    await page.getByTestId("set-assignee").click();

    // Navigate away and come back to test persistence
    await page.goto("http://127.0.0.1:3000/");
    await page.goto(baseUrl);

    // Check state persists
    const state = await getState(page);
    expect(state.search).toBe("test search");
    expect(state.labels).toContain(2);
    expect(state.assigneeId).toBe(123);
});

test("complex label", async ({ page }) => {
    // Add several labels
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("add-label-2").click();
    await page.getByTestId("add-label-3").click();

    let state = await getState(page);
    expect(state.labels).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(state.labels.length).toBe(3);

    // Remove middle label
    await page.getByTestId("remove-label-2").click();

    state = await getState(page);
    expect(state.labels).toEqual(expect.arrayContaining([1, 3]));
    expect(state.labels.length).toBe(2);

    // Add it again
    await page.getByTestId("add-label-2").click();

    state = await getState(page);
    expect(state.labels).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(state.labels.length).toBe(3);

    // Remove all labels
    await page.getByTestId("clear-labels").click();

    state = await getState(page);
    expect(state.labels).toEqual([]);
});
