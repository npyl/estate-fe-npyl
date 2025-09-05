import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------------------------

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
>;

// ----------------------------------------------------------------------------------------

type TGet = (name: string) => string | null;

interface IOptions {
    get: TGet;
}

const setupUseSearchParamsMock = ({ get }: IOptions) =>
    mockUseSearchParams.mockReturnValue({
        get,
    } as any);

// ----------------------------------------------------------------------------------------

export { setupUseSearchParamsMock };
