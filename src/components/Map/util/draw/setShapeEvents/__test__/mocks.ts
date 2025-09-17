import setCircleEvents from "../circle";

// Mock the circle module
jest.mock("../circle");

// Type the mocked functions
const mockedSetCircleEvents = setCircleEvents as jest.MockedFunction<
    typeof setCircleEvents
>;

// Mock Google Maps API
const mockAddListener = jest.fn();
const mockAddListenerOnce = jest.fn();

class MockCircle {}
class MockRectangle {}
class MockPolygon {}

// Setup global Google Maps API mock
global.google = {
    maps: {
        event: {
            addListener: mockAddListener,
            addListenerOnce: mockAddListenerOnce,
        },
        Circle: MockCircle,
        Rectangle: MockRectangle,
        Polygon: MockPolygon,
    },
} as unknown as typeof global.google;

type TMockListener = google.maps.MapsEventListener;

const mockListeners: TMockListener[] = [
    { listener: "mock1" } as unknown as TMockListener,
    { listener: "mock2" } as unknown as TMockListener,
];

/**
 * Setup all mocks with default return values and clear call history
 */
export const setupMocks = () => {
    jest.clearAllMocks();

    // Setup the mock to return mock listeners
    mockedSetCircleEvents.mockReturnValue(mockListeners);

    // Clear mock call history
    mockedSetCircleEvents.mockClear();
    mockAddListener.mockClear();
    mockAddListenerOnce.mockClear();
};

/**
 * Get the shape onChange callback from the mocked setCircleEvents
 */
const getShapeOnChangeCallback = () => {
    if (
        !mockedSetCircleEvents.mock.calls[0] ||
        !mockedSetCircleEvents.mock.calls[0][1]
    ) {
        throw new Error("setCircleEvents was not called or callback not found");
    }
    return mockedSetCircleEvents.mock.calls[0][1];
};

/**
 * Get the mouseup callback from the mocked addListenerOnce
 */
const getMouseUpCallback = () => {
    if (
        !mockAddListenerOnce.mock.calls[0] ||
        !mockAddListenerOnce.mock.calls[0][2]
    ) {
        throw new Error(
            "addListenerOnce was not called or mouseup callback not found"
        );
    }
    return mockAddListenerOnce.mock.calls[0][2];
};

/**
 * Trigger the shape change event
 */
export const triggerShapeChange = () => {
    const callback = getShapeOnChangeCallback();
    callback();
};

/**
 * Trigger the mouseup event
 */
export const triggerMouseUp = () => {
    const callback = getMouseUpCallback();
    callback();
};

/**
 * Verify that the required mocks have been called
 */
export const verifyMocksCalled = () => {
    expect(mockedSetCircleEvents).toHaveBeenCalledTimes(1);
    expect(mockAddListenerOnce).toHaveBeenCalledTimes(1);
    expect(mockedSetCircleEvents.mock.calls[0]).toHaveLength(2);
    expect(mockAddListenerOnce.mock.calls[0]).toHaveLength(3);
};
