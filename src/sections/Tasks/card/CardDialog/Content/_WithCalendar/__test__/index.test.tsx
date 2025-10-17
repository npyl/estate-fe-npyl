// ============================================================================
// SCENARIO 1:      w/o User ID
// SCENARIO 2.1:    w/ User ID,     w/o Google Workspace email
// SCENARIO 2.2:    w/ User Id,     w/  Google Workspace email
// ============================================================================

// ----------------------------------------------------------------------------

import { setupUseTranslationMock } from "@/test/mock/useTranslation";
import { setupUseAuthMock } from "@/test/mock/useAuth";
import preloadAll from "jest-next-dynamic";

setupUseTranslationMock();
setupUseAuthMock();

jest.mock("@/services/user", () => ({
    useGetUserQuery: jest.fn(),
}));

jest.mock("@/services/calendar", () => ({
    useCalendarAuth: jest.fn(),
}));

jest.mock("@/services/google-oauth", () => ({
    useLogoutMutation: jest.fn(() => [jest.fn(), {}]),
}));

jest.mock("@/services/company", () => ({
    useIsGoogleWorkspaceIntegratedQuery: jest.fn(() => ({
        data: {
            isIntegrated: true,
            domain: "digipath.gr",
        },
        isLoading: false,
    })),
}));

// ----------------------------------------------------------------------------

import { render, screen } from "@testing-library/react";
import Tester, { TesterProps } from "./Tester";
import {
    PROTECTED_CONTENT_TESTID,
    ERROR_INFO_TESTID,
} from "../Section/WorkspaceUserGuard";
import { WITH_CALENDAR_SWITCH_TESTID } from "../Section/WithCalendarSwitch/constants";
import "@testing-library/jest-dom";

// ----------------------------------------------------------------------------

const renderTester = (defaultValues: TesterProps["defaultValues"]) =>
    render(<Tester defaultValues={defaultValues} />).container;

// ----------------------------------------------------------------------------

const expectErrorInfo = () => expect(screen.queryByTestId(ERROR_INFO_TESTID));

const expectProtected = () =>
    expect(screen.queryByTestId(PROTECTED_CONTENT_TESTID));

const expectCalendarSwitch = () =>
    expect(screen.queryByTestId(WITH_CALENDAR_SWITCH_TESTID));

// ----------------------------------------------------------------------------

const mock_NoUserId = () => {
    const { useGetUserQuery } = require("@/services/user");
    useGetUserQuery.mockReturnValue({ isLoading: false });
};

const mock_UserId_NoWorkspaceEmail = () => {
    const { useGetUserQuery } = require("@/services/user");
    useGetUserQuery.mockReturnValue({
        data: {
            id: 456,
            workspaceEmail: null, // No workspace email
        },
        isLoading: false,
    });
};

const mock_UserId_WorkspaceEmail = () => {
    const { useGetUserQuery } = require("@/services/user");
    useGetUserQuery.mockReturnValue({
        data: {
            id: 123,
            workspaceEmail: "user@company.com",
        },
        isLoading: false,
    });
};

// ----------------------------------------------------------------------------

beforeAll(async () => {
    await preloadAll();
});

describe("Tasks.WithCalendar", () => {
    describe("[1]: No user ID selected", () => {
        beforeEach(() => {
            mock_NoUserId();
        });

        it("userIds is empty array", () => {
            const container = renderTester({ userIds: [] });
            expect(container).toBeEmptyDOMElement();
        });
        it("userIds is undefined", () => {
            const container = renderTester({ userIds: undefined });
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe("[2.1]: w/o Google Workspace email", () => {
        beforeEach(() => {
            mock_UserId_NoWorkspaceEmail();
        });

        it("ErrorInfo", () => {
            renderTester({ userIds: [456] });

            expectErrorInfo().toBeInTheDocument();
            expectProtected().not.toBeInTheDocument();
            expectCalendarSwitch().not.toBeInTheDocument();
        });
    });

    it("[2.2]: w/ Google Workspace email", () => {
        mock_UserId_WorkspaceEmail();

        renderTester({ userIds: [123] });

        expectErrorInfo().not.toBeInTheDocument();
        expectProtected().toBeInTheDocument();
        expectCalendarSwitch().toBeInTheDocument();
    });
});
