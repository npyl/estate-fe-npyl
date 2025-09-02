import { renderHook } from "@testing-library/react";
import useDateLocale from ".";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------

jest.mock("react-i18next");

const mockUseTranslation = useTranslation as any;

const setLanguage = (language: string) =>
    mockUseTranslation.mockImplementation(
        () =>
            ({
                i18n: { language },
            }) as any
    );

// ---------------------------------------------------------------------

describe("useDateLocale", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("greek", async () => {
        setLanguage("gr");
        const { result } = renderHook(useDateLocale);
        expect(result.current).toBe("el-GR");
    });
    test("english", () => {
        setLanguage("en");
        const { result } = renderHook(useDateLocale);
        expect(result.current).toBe("en-US");
    });
});
