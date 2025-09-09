import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import useUnsavedChangesWatcher from "@/components/hook-form/useFormPersist/useUnsavedWatcher";
import { setupUseTranslationMock } from "@/test/mock/useTranslation";
import triggerEvent from "./triggerEvent";

// ---------------------------------------------------------------------------------

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

const mockRouterEvents = {
    on: jest.fn(),
    off: jest.fn(),
};

const mockRouter = {
    asPath: "/current-path",
    events: mockRouterEvents,
};

// ---------------------------------------------------------------------------------

const renderUnsavedWatcher = (mockOnExit: jest.Mock<any, any, any>) =>
    renderHook(() => useUnsavedChangesWatcher(mockOnExit));

// ---------------------------------------------------------------------------------

describe("useUnsavedChangesWatcher", () => {
    let mockOnExit: jest.Mock<any, any, any>;
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup mocks
        mockOnExit = jest.fn();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        setupUseTranslationMock();

        // Spy on window event listeners
        addEventListenerSpy = jest.spyOn(window, "addEventListener");
        removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    });

    afterEach(() => {
        // Restore spies
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    it("on beforeunload", () => {
        renderUnsavedWatcher(mockOnExit);
        const result = triggerEvent(addEventListenerSpy, "beforeunload");
        expect(mockOnExit).toHaveBeenCalledTimes(1);
        expect(result).toBe("");
    });

    it("onRouteChange (different path)", () => {
        renderUnsavedWatcher(mockOnExit);

        triggerEvent(
            mockRouterEvents.on,
            "routeChangeStart",
            "/different-path"
        );

        expect(mockOnExit).toHaveBeenCalledTimes(1);
    });

    it("onRouteChange (same path)", () => {
        renderUnsavedWatcher(mockOnExit);
        triggerEvent(mockRouterEvents.on, "routeChangeStart", "/current-path");
        expect(mockOnExit).not.toHaveBeenCalled();
    });

    it("onRouteChange (same path w/ query params)", () => {
        // Update mock router with query params
        const routerWithQuery = {
            ...mockRouter,
            asPath: "/current-path?param=value",
        };

        (useRouter as jest.Mock).mockReturnValue(routerWithQuery);

        renderUnsavedWatcher(mockOnExit);

        triggerEvent(mockRouterEvents.on, "routeChangeStart", "/current-path");
        expect(mockOnExit).toHaveBeenCalledTimes(1);

        // Same path with same query should not trigger onExit
        mockOnExit.mockClear();
        triggerEvent(
            mockRouterEvents.on,
            "routeChangeStart",
            "/current-path?param=value"
        );
        expect(mockOnExit).not.toHaveBeenCalled();
    });
});
