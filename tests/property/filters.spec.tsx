import { test, expect, Page } from "@playwright/test";
import { TTestCb } from "../_types";

import {
    ASCENDING_PRICE,
    DESCENDING_PRICE,
} from "../../src/sections/Properties/(FiltersBar)/constants";
import gotoSafe from "../_util/gotoSafe";

const STATE_SELECTOR = '[data-testid="current-state"] pre';

const getState = async (page: Page) => {
    const updatedState = await page.textContent(STATE_SELECTOR);
    if (!updatedState) throw "Could not get state";
    return JSON.parse(updatedState);
};

test.beforeEach(async ({ page }) => {
    await gotoSafe(page, "http://127.0.0.1:3000/__test__/propertyFilters");
});

const update = async ({ page }: TTestCb) => {
    let state;

    // Test updating minPrice
    await page.getByTestId("set-min-price").click();
    state = await getState(page);
    expect(state.filters.minPrice).toBe(100000);
    expect(state.ids).toContain("minPrice");

    // Test updating maxPrice
    await page.getByTestId("set-max-price").click();
    state = await getState(page);
    expect(state.filters.maxPrice).toBe(500000);
    expect(state.ids).toContain("maxPrice");

    // Test adding minArea
    await page.getByTestId("set-min-area").click();
    state = await getState(page);
    expect(state.filters.minArea).toBe(50);
    expect(state.ids).toContain("minArea");
};

const toggleArrayFilters = async ({ page }: TTestCb) => {
    let state;

    // Test with categories
    await page.click('[data-testid="toggle-category-apartment"]');
    state = await getState(page);
    expect(state.filters.categories).toContain("apartment");
    expect(state.ids).toContain("categories");

    await page.click('[data-testid="toggle-category-apartment"]');
    state = await getState(page);
    expect(state.filters.categories).not.toContain("apartment");
    expect(state.ids).not.toContain("categories");
};

const deleteFilters = async ({ page }: TTestCb) => {
    // First add minPrice
    await page.click('[data-testid="set-min-price"]');

    // Then delete it
    await page.click('[data-testid="delete-min-price"]');

    const state = await getState(page);
    expect(state.filters.minPrice).toBeUndefined();
    expect(state.ids).not.toContain("minPrice");
};

const complexSequence = async ({ page }: TTestCb) => {
    // Add minPrice
    await page.click('[data-testid="set-min-price"]');

    // Add a region
    await page.click('[data-testid="toggle-region-athens"]');

    // Add maxPrice
    await page.click('[data-testid="set-max-price"]');

    // Delete regions
    await page.click('[data-testid="delete-regions"]');

    const state = await getState(page);

    // Check final state
    expect(state.filters.minPrice).toBe(100000);
    expect(state.filters.maxPrice).toBe(500000);
    expect(state.filters.regions).toEqual([]);
    expect(state.ids).toContain("minPrice");
    expect(state.ids).toContain("maxPrice");
    expect(state.ids).not.toContain("regions");
};

const sorting = async ({ page }: TTestCb) => {
    // Check the initial sorting value
    let state = await getState(page);
    const initialSorting = state.sorting;

    // Update sorting to price asc
    await page.click('[data-testid="sort-price-asc"]');
    state = await getState(page);
    expect(state.sorting).toBe(ASCENDING_PRICE);
    expect(state.sorting).not.toBe(initialSorting);

    // Update sorting to price desc
    await page.click('[data-testid="sort-price-desc"]');
    state = await getState(page);
    expect(state.sorting).toBe(DESCENDING_PRICE);
};

test.describe("property", () => {
    test("should update filters correctly", update);
    test("should toggle array filters correctly", toggleArrayFilters);
    test("should delete filters correctly", deleteFilters);
    test("should handle complex sequence of operations", complexSequence);
    test("sorting", sorting);
});
