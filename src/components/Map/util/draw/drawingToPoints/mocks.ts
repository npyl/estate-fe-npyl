import { DrawShape } from "@/components/Map/types";

const asDrawShape = (s: any) => s as DrawShape;

// Mock Google Maps API
const mockGoogle = {
    maps: {
        Rectangle: jest.fn(),
        Circle: jest.fn(),
        Polygon: jest.fn(),
    },
};

const getMockRectangleBasic = () => {
    // Mock Rectangle instance
    const mockRectangle = {
        getBounds: jest.fn(() => ({
            getNorthEast: jest.fn(() => ({
                lat: jest.fn(() => 40.7829),
                lng: jest.fn(() => -73.9654),
            })),
            getSouthWest: jest.fn(() => ({
                lat: jest.fn(() => 40.7489),
                lng: jest.fn(() => -73.9971),
            })),
        })),
    };

    // Make instanceof work
    Object.setPrototypeOf(mockRectangle, mockGoogle.maps.Rectangle.prototype);

    return asDrawShape(mockRectangle);
};

const getMockRectangleNoBounds = () => {
    const mockRectangle = {
        getBounds: jest.fn(() => null),
    };
    Object.setPrototypeOf(mockRectangle, mockGoogle.maps.Rectangle.prototype);

    return asDrawShape(mockRectangle);
};

const getMockRectangleInvalidBounds = () => {
    const mockRectangle = {
        getBounds: jest.fn(() => ({
            getNorthEast: jest.fn(() => null),
            getSouthWest: jest.fn(() => null),
        })),
    };
    Object.setPrototypeOf(mockRectangle, mockGoogle.maps.Rectangle.prototype);

    return asDrawShape(mockRectangle);
};

const getMockCircleBasic = () => {
    const mockCircle = {
        getCenter: jest.fn(() => ({
            lat: jest.fn(() => 40.7589),
            lng: jest.fn(() => -73.9851),
        })),
        getRadius: jest.fn(() => 1000),
    };

    Object.setPrototypeOf(mockCircle, mockGoogle.maps.Circle.prototype);

    return asDrawShape(mockCircle);
};

const getMockCircleNoCenter = () => {
    const mockCircle = {
        getCenter: jest.fn(() => null),
        getRadius: jest.fn(() => 1000),
    };
    Object.setPrototypeOf(mockCircle, mockGoogle.maps.Circle.prototype);

    return asDrawShape(mockCircle);
};

const getMockCircleInvalidCenter = () => {
    const mockCircle = {
        getCenter: jest.fn(() => ({
            lat: null,
            lng: null,
        })),
        getRadius: jest.fn(() => 1000),
    };
    Object.setPrototypeOf(mockCircle, mockGoogle.maps.Circle.prototype);

    return asDrawShape(mockCircle);
};

const getMockPolygonBasic = () => {
    const mockPath = {
        getLength: jest.fn(() => 3),
        getAt: jest.fn((index) => {
            const points = [
                {
                    lat: jest.fn(() => 40.7589),
                    lng: jest.fn(() => -73.9851),
                },
                {
                    lat: jest.fn(() => 40.7629),
                    lng: jest.fn(() => -73.9801),
                },
                {
                    lat: jest.fn(() => 40.7569),
                    lng: jest.fn(() => -73.9801),
                },
            ];
            return points[index];
        }),
    };

    const mockPolygon = {
        getPath: jest.fn(() => mockPath),
    };

    Object.setPrototypeOf(mockPolygon, mockGoogle.maps.Polygon.prototype);

    return asDrawShape(mockPolygon);
};

const getMockPolygonEmpty = () => {
    const mockPath = {
        getLength: jest.fn(() => 0),
        getAt: jest.fn(),
    };

    const mockPolygon = {
        getPath: jest.fn(() => mockPath),
    };

    Object.setPrototypeOf(mockPolygon, mockGoogle.maps.Polygon.prototype);

    return asDrawShape(mockPolygon);
};

const getMockUnknownShape = () => {
    // Mock an unknown shape that doesn't match any instanceof checks
    const mockUnknownShape = {
        someMethod: jest.fn(),
    };

    return asDrawShape(mockUnknownShape);
};

export {
    mockGoogle,
    // ...
    getMockRectangleBasic,
    getMockRectangleNoBounds,
    getMockRectangleInvalidBounds,
    getMockCircleBasic,
    getMockCircleNoCenter,
    getMockCircleInvalidCenter,
    getMockPolygonBasic,
    getMockPolygonEmpty,
    getMockUnknownShape,
};
