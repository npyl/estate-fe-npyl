import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Tester, { DIV_TESTID } from "./index.comp";
import "@testing-library/jest-dom";

// ----------------------------------------------------------------------------------------------

const expectContentFound = () =>
    expect(screen.getByTestId(DIV_TESTID)).toBeInTheDocument();

const expectContentUnauthorized = () => {
    let unauthorized = true;
    try {
        expectContentFound();

        // INFO: reaching here should not be possible
        unauthorized = false;
    } catch (ex) {
        // ignore...
    }
    expect(unauthorized).toBe(true);
};

// ----------------------------------------------------------------------------------------------

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

interface MockOptions {
    isReady: boolean;
}

const setupMock = (options: MockOptions) => {
    const { isReady } = options;

    // Mock router
    mockUseRouter.mockReturnValue({
        isReady,
    } as any);
};

// ----------------------------------------------------------------------------------------------

describe("_isReady", () => {
    it("non-ready", () => {
        setupMock({ isReady: false });
        render(<Tester />);
        expectContentUnauthorized();
    });
    it("ready", () => {
        setupMock({ isReady: true });
        render(<Tester />);
        expectContentFound();
    });
});
