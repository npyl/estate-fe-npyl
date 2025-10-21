const setupPinoMock = () => {
    jest.mock("pino", () => {
        const mockLogger: any = {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            child: jest.fn(() => mockLogger),
        };

        return {
            __esModule: true,
            default: jest.fn(() => mockLogger),
        };
    });
};

export { setupPinoMock };
