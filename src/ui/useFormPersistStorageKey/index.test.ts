import { renderHook } from "@testing-library/react";
import useFormPersistStorageKey from ".";

// ----------------------------------------------------------------------------------

const BASENAME = "SOME_KEY";

const RESOURCE_ID = 123;
const CREATE_MODE = -1;

const DISABLED = true;

// ----------------------------------------------------------------------------------

const getRenderedValue = (
    baseName: string,
    resourceId?: number,
    disabled?: boolean | undefined
) =>
    renderHook(() => useFormPersistStorageKey(baseName, resourceId, disabled))
        ?.result?.current;

// ----------------------------------------------------------------------------------

describe("useFormPersistStorageKey", () => {
    test("disabled", () => {
        const res = getRenderedValue(BASENAME, RESOURCE_ID, DISABLED);
        expect(res).toBe(null);
    });
    test("create", () => {
        const res = getRenderedValue(BASENAME, CREATE_MODE);
        expect(res).toBe(`${BASENAME}-create`);
    });
    test("edit", () => {
        const res = getRenderedValue(BASENAME, RESOURCE_ID);
        expect(res).toBe(`${BASENAME}-${RESOURCE_ID}`);
    });
});
