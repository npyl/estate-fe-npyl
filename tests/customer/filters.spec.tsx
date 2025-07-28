import { test, expect, Page } from "@playwright/test";
import gotoSafe from "../_util/gotoSafe";

const baseUrl = "http://127.0.0.1:3000/__test__/customerFilters";

// Helper function to get current filter state
const getState = async (page: Page) => {
    const stateElement = await page.getByTestId("current-state");
    const stateText = await stateElement.textContent();
    return JSON.parse(stateText || "{}");
};

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, baseUrl);
});

test("status filter", async ({ page }) => {
    // Set status
    await page.getByTestId("set-status").click();
    let state = await getState(page);
    expect(state.filters.status).toBe(1);

    // Clear status
    await page.getByTestId("clear-status").click();
    state = await getState(page);
    expect(state.filters.status).toBeUndefined();
});

test("role filters - leaser", async ({ page }) => {
    // Set leaser
    await page.getByTestId("set-leaser").click();
    let state = await getState(page);
    expect(state.filters.leaser).toBe(true);

    // Clear leaser
    await page.getByTestId("clear-leaser").click();
    state = await getState(page);
    expect(state.filters.leaser).toBe(false);
});

test("role filters - lessor", async ({ page }) => {
    // Set lessor
    await page.getByTestId("set-lessor").click();
    let state = await getState(page);
    expect(state.filters.lessor).toBe(true);

    // Clear lessor
    await page.getByTestId("clear-lessor").click();
    state = await getState(page);
    expect(state.filters.lessor).toBe(false);
});

test("role filters - seller", async ({ page }) => {
    // Set seller
    await page.getByTestId("set-seller").click();
    let state = await getState(page);
    expect(state.filters.seller).toBe(true);

    // Clear seller
    await page.getByTestId("clear-seller").click();
    state = await getState(page);
    expect(state.filters.seller).toBe(false);
});

test("role filters - buyer", async ({ page }) => {
    // Set buyer
    await page.getByTestId("set-buyer").click();
    let state = await getState(page);
    expect(state.filters.buyer).toBe(true);

    // Clear buyer
    await page.getByTestId("clear-buyer").click();
    state = await getState(page);
    expect(state.filters.buyer).toBe(false);
});

test("b2b filter", async ({ page }) => {
    // Set b2b
    await page.getByTestId("set-b2b").click();
    let state = await getState(page);
    expect(state.filters.b2b).toBe(true);

    // Clear b2b
    await page.getByTestId("clear-b2b").click();
    state = await getState(page);
    expect(state.filters.b2b).toBe(false);
});

test("manager filter", async ({ page }) => {
    // Set manager
    await page.getByTestId("set-manager").click();
    let state = await getState(page);
    expect(state.filters.managerId).toBe(123);

    // Clear manager
    await page.getByTestId("clear-manager").click();
    state = await getState(page);
    expect(state.filters.managerId).toBeUndefined();
});

test("price filters", async ({ page }) => {
    // Set min price
    await page.getByTestId("set-min-price").click();
    let state = await getState(page);
    expect(state.filters.minPrice).toBe(100000);

    // Set max price
    await page.getByTestId("set-max-price").click();
    state = await getState(page);
    expect(state.filters.maxPrice).toBe(500000);

    // Clear min price
    await page.getByTestId("clear-min-price").click();
    state = await getState(page);
    expect(state.filters.minPrice).toBeUndefined();
    expect(state.filters.maxPrice).toBe(500000); // Max should remain

    // Clear max price
    await page.getByTestId("clear-max-price").click();
    state = await getState(page);
    expect(state.filters.maxPrice).toBeUndefined();
});

test("area filters", async ({ page }) => {
    // Set min area
    await page.getByTestId("set-min-area").click();
    let state = await getState(page);
    expect(state.filters.minCovered).toBe(50);

    // Set max area
    await page.getByTestId("set-max-area").click();
    state = await getState(page);
    expect(state.filters.maxCovered).toBe(200);

    // Clear min area
    await page.getByTestId("clear-min-area").click();
    state = await getState(page);
    expect(state.filters.minCovered).toBeUndefined();
    expect(state.filters.maxCovered).toBe(200); // Max should remain

    // Clear max area
    await page.getByTestId("clear-max-area").click();
    state = await getState(page);
    expect(state.filters.maxCovered).toBeUndefined();
});

test("labels filter", async ({ page }) => {
    // Add first label
    await page.getByTestId("add-label-1").click();
    let state = await getState(page);
    expect(state.filters.labels).toContain(1);

    // Add second label
    await page.getByTestId("add-label-2").click();
    state = await getState(page);
    expect(state.filters.labels).toEqual(expect.arrayContaining([1, 2]));

    // Remove first label
    await page.getByTestId("remove-label-1").click();
    state = await getState(page);
    expect(state.filters.labels).not.toContain(1);
    expect(state.filters.labels).toContain(2);

    // Clear all labels
    await page.getByTestId("clear-labels").click();
    state = await getState(page);
    expect(state.filters.labels).toEqual([]);
});

test("categories filter", async ({ page }) => {
    // Add first category
    await page.getByTestId("add-category-residential").click();
    let state = await getState(page);
    expect(state.filters.categories).toContain("residential");

    // Add second category
    await page.getByTestId("add-category-commercial").click();
    state = await getState(page);
    expect(state.filters.categories).toEqual(
        expect.arrayContaining(["residential", "commercial"])
    );

    // Remove first category
    await page.getByTestId("remove-category-residential").click();
    state = await getState(page);
    expect(state.filters.categories).not.toContain("residential");
    expect(state.filters.categories).toContain("commercial");

    // Clear all categories
    await page.getByTestId("clear-categories").click();
    state = await getState(page);
    expect(state.filters.categories).toEqual([]);
});

test("parent categories filter", async ({ page }) => {
    // Add first parent category
    await page.getByTestId("add-parent-category-sale").click();
    let state = await getState(page);
    expect(state.filters.parentCategories).toContain("sale");

    // Add second parent category
    await page.getByTestId("add-parent-category-rent").click();
    state = await getState(page);
    expect(state.filters.parentCategories).toEqual(
        expect.arrayContaining(["sale", "rent"])
    );

    // Remove first parent category
    await page.getByTestId("remove-parent-category-sale").click();
    state = await getState(page);
    expect(state.filters.parentCategories).not.toContain("sale");
    expect(state.filters.parentCategories).toContain("rent");

    // Clear all parent categories
    await page.getByTestId("clear-parent-categories").click();
    state = await getState(page);
    expect(state.filters.parentCategories).toEqual([]);
});

test("states filter", async ({ page }) => {
    // Add first state
    await page.getByTestId("add-state-active").click();
    let state = await getState(page);
    expect(state.filters.states).toContain("active");

    // Add second state
    await page.getByTestId("add-state-inactive").click();
    state = await getState(page);
    expect(state.filters.states).toEqual(
        expect.arrayContaining(["active", "inactive"])
    );

    // Remove first state
    await page.getByTestId("remove-state-active").click();
    state = await getState(page);
    expect(state.filters.states).not.toContain("active");
    expect(state.filters.states).toContain("inactive");

    // Clear all states
    await page.getByTestId("clear-states").click();
    state = await getState(page);
    expect(state.filters.states).toEqual([]);
});

test("sorting", async ({ page }) => {
    // Set sorting to name ascending
    await page.getByTestId("sort-name-asc").click();
    let state = await getState(page);
    expect(state.sorting).toBe("name-asc");

    // Set sorting to created date descending
    await page.getByTestId("sort-created-desc").click();
    state = await getState(page);
    expect(state.sorting).toBe("created-desc");

    // Reset to default sorting
    await page.getByTestId("sort-default").click();
    state = await getState(page);
    expect(state.sorting).toBe("default");
});

test("delete individual filter", async ({ page }) => {
    // Set multiple filters
    await page.getByTestId("set-status").click();
    await page.getByTestId("set-leaser").click();
    await page.getByTestId("set-min-price").click();

    // Verify filters are set
    let state = await getState(page);
    expect(state.filters.status).toBe(1);
    expect(state.filters.leaser).toBe(true);
    expect(state.filters.minPrice).toBe(100000);

    // Delete status filter
    await page.getByTestId("delete-status-filter").click();
    state = await getState(page);
    expect(state.filters.status).toBeUndefined();
    expect(state.filters.leaser).toBe(true); // Other filters should remain
    expect(state.filters.minPrice).toBe(100000);

    // Delete price filter
    await page.getByTestId("delete-minPrice-filter").click();
    state = await getState(page);
    expect(state.filters.minPrice).toBeUndefined();
    expect(state.filters.leaser).toBe(true); // Leaser should remain
});

test("reset all filters", async ({ page }) => {
    // Set multiple filters
    await page.getByTestId("set-status").click();
    await page.getByTestId("set-leaser").click();
    await page.getByTestId("set-lessor").click();
    await page.getByTestId("set-manager").click();
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("add-category-residential").click();
    await page.getByTestId("set-min-price").click();
    await page.getByTestId("set-max-area").click();
    await page.getByTestId("sort-name-asc").click();

    // Verify filters are set
    let state = await getState(page);
    expect(state.filters.status).toBe(1);
    expect(state.filters.leaser).toBe(true);
    expect(state.filters.lessor).toBe(true);
    expect(state.filters.managerId).toBe(123);
    expect(state.filters.labels).toContain(1);
    expect(state.filters.categories).toContain("residential");
    expect(state.filters.minPrice).toBe(100000);
    expect(state.filters.maxCovered).toBe(200);
    expect(state.sorting).toBe("name-asc");

    // Reset all filters
    await page.getByTestId("reset-all-filters").click();

    // Verify all filters are reset to initial state
    state = await getState(page);
    expect(state.filters.labels).toEqual([]);
    expect(state.filters.categories).toEqual([]);
    expect(state.filters.parentCategories).toEqual([]);
    expect(state.filters.leaser).toBe(false);
    expect(state.filters.lessor).toBe(false);
    expect(state.filters.buyer).toBe(false);
    expect(state.filters.seller).toBe(false);
    expect(state.filters.b2b).toBe(false);
    expect(state.filters.status).toBeUndefined();
    expect(state.filters.managerId).toBeUndefined();
    expect(state.filters.maxPrice).toBeUndefined();
    expect(state.filters.minPrice).toBeUndefined();
    expect(state.filters.minCovered).toBeUndefined();
    expect(state.filters.maxCovered).toBeUndefined();
    expect(state.filters.states).toEqual([]);
    expect(state.sorting).toBe("default");
});

test("complex filter combinations", async ({ page }) => {
    // Set multiple role filters
    await page.getByTestId("set-leaser").click();
    await page.getByTestId("set-seller").click();

    // Set price range
    await page.getByTestId("set-min-price").click();
    await page.getByTestId("set-max-price").click();

    // Set area range
    await page.getByTestId("set-min-area").click();
    await page.getByTestId("set-max-area").click();

    // Add multiple labels
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("add-label-2").click();

    // Add categories
    await page.getByTestId("add-category-residential").click();
    await page.getByTestId("add-parent-category-sale").click();

    // Set manager and status
    await page.getByTestId("set-manager").click();
    await page.getByTestId("set-status").click();

    let state = await getState(page);
    expect(state.filters.leaser).toBe(true);
    expect(state.filters.seller).toBe(true);
    expect(state.filters.lessor).toBe(false);
    expect(state.filters.buyer).toBe(false);
    expect(state.filters.minPrice).toBe(100000);
    expect(state.filters.maxPrice).toBe(500000);
    expect(state.filters.minCovered).toBe(50);
    expect(state.filters.maxCovered).toBe(200);
    expect(state.filters.labels).toEqual(expect.arrayContaining([1, 2]));
    expect(state.filters.categories).toContain("residential");
    expect(state.filters.parentCategories).toContain("sale");
    expect(state.filters.managerId).toBe(123);
    expect(state.filters.status).toBe(1);

    // Modify some filters
    await page.getByTestId("clear-leaser").click();
    await page.getByTestId("set-buyer").click();
    await page.getByTestId("remove-label-1").click();
    await page.getByTestId("clear-min-price").click();

    state = await getState(page);
    expect(state.filters.leaser).toBe(false);
    expect(state.filters.buyer).toBe(true);
    expect(state.filters.seller).toBe(true);
    expect(state.filters.labels).toEqual([2]);
    expect(state.filters.minPrice).toBeUndefined();
    expect(state.filters.maxPrice).toBe(500000); // Should remain
});

test("filter persistence", async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    // Set multiple filters
    await page.getByTestId("set-leaser").click();
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("set-manager").click();
    await page.getByTestId("set-min-price").click();

    // Navigate away and come back to test persistence
    await gotoSafe(page, "http://127.0.0.1:3000/");
    await gotoSafe(page, baseUrl);

    // Check state persists (assuming persistence is implemented)
    const state = await getState(page);
    expect(state.filters.leaser).toBe(true);
    expect(state.filters.labels).toContain(1);
    expect(state.filters.managerId).toBe(123);
    expect(state.filters.minPrice).toBe(100000);
});

test("edge cases - duplicate operations", async ({ page }) => {
    // Add same label multiple times
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("add-label-1").click();
    await page.getByTestId("add-label-1").click();

    let state = await getState(page);
    // Should only contain the label once
    expect(state.filters.labels.filter((id: number) => id === 1).length).toBe(
        1
    );

    // Remove label that doesn't exist
    await page.getByTestId("remove-label-3").click();
    state = await getState(page);
    expect(state.filters.labels).toContain(1); // Should remain unchanged

    // Set same role multiple times
    await page.getByTestId("set-leaser").click();
    await page.getByTestId("set-leaser").click();
    state = await getState(page);
    expect(state.filters.leaser).toBe(true);
});

test("price and area validation", async ({ page }) => {
    // Set min price higher than max price scenario
    await page.getByTestId("set-max-price").click(); // 500000
    await page.getByTestId("set-high-min-price").click(); // Should set higher value

    let state = await getState(page);
    expect(state.filters.maxPrice).toBe(500000);
    expect(state.filters.minPrice).toBeDefined();

    // Similar test for area
    await page.getByTestId("set-max-area").click(); // 200
    await page.getByTestId("set-high-min-area").click(); // Should set higher value

    state = await getState(page);
    expect(state.filters.maxCovered).toBe(200);
    expect(state.filters.minCovered).toBeDefined();
});
