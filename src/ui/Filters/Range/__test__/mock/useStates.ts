import { useStates } from "@/sections/Properties/FiltersContext";

// ------------------------------------------------------------------------------

jest.mock("@/sections/Properties/FiltersContext", () => ({
    useStates: jest.fn(),
}));

const mockUseStates = useStates as jest.MockedFunction<typeof useStates>;

// ------------------------------------------------------------------------------

const setupUseStatesMock = (states: string[] = []) => {
    mockUseStates.mockReturnValue(states);
};

// ------------------------------------------------------------------------------

export { setupUseStatesMock };
