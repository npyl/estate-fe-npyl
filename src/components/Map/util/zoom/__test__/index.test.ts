import getZoomFromShape from "@/components/Map/util/zoom"; // Assuming this is the main function
import { DEFAULT_ZOOM } from "@/components/Map/util/zoom/constant"; // Assuming constants are in this file
import { TShape } from "@/types/shape";

// Radius of 300km (600km diameter)
const largeCircle: TShape = [
    { x: -74.006, y: 40.7128 }, // Center point
    { x: 300000, y: null }, // Radius
];

// Radius of 30km meters (60km diameter)
const smallCircle: TShape = [
    { x: -74.006, y: 40.7128 }, // Center point
    { x: 30000, y: null }, // Radius
];

const rectangle: TShape = [
    { x: -80, y: 35 },
    { x: -75, y: 35 },
    { x: -75, y: 32 },
    { x: -80, y: 32 },
    { x: -80, y: 35 },
];

const polygon: TShape = [
    { x: -100, y: 40 },
    { x: -98, y: 41 },
    { x: -101, y: 39 },
];

describe("getZoomFromShape", () => {
    it("empty shape", () => {
        expect(getZoomFromShape(null)).toBe(DEFAULT_ZOOM);
        expect(getZoomFromShape([])).toBe(DEFAULT_ZOOM);
    });

    it("circle (large)", () => {
        expect(getZoomFromShape(largeCircle)).toBe(6);
    });

    it("circle (small)", () => {
        expect(getZoomFromShape(smallCircle)).toBe(10);
    });

    it("rectangle", () => {
        // lngSpan is 5, latSpan is 3. maxSpan is 5.
        // Since maxSpan (5) is not > 5, it falls to the next condition (> 2), resulting in a zoom of 8.
        expect(getZoomFromShape(rectangle)).toBe(8);
    });

    it("polygon", () => {
        // lngSpan is 3, latSpan is 2. maxSpan is 3.
        // For a maxSpan > 2, the expected zoom is 8.
        expect(getZoomFromShape(polygon)).toBe(8);
    });
});
