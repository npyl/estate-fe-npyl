import drawingToPoints from "@/components/Map/util/draw/drawingToPoints";
import {
    getMockCircleBasic,
    getMockCircleInvalidCenter,
    getMockCircleNoCenter,
    getMockPolygonBasic,
    getMockPolygonEmpty,
    getMockRectangleBasic,
    getMockRectangleInvalidBounds,
    getMockRectangleNoBounds,
    getMockUnknownShape,
    mockGoogle,
} from "./mocks";
import { DrawShape } from "@/components/Map/types";

const pretendValid = (s: any) => s as DrawShape;

global.google = mockGoogle as any;

describe("drawingToPoints", () => {
    describe("Rectangle", () => {
        it("basic", () => {
            const result = drawingToPoints(getMockRectangleBasic());

            expect(result).toEqual([
                { x: 40.7489, y: -73.9971 }, // southwest
                { x: 40.7489, y: -73.9654 }, // southeast
                { x: 40.7829, y: -73.9654 }, // northeast
                { x: 40.7829, y: -73.9971 }, // northwest
            ]);
        });

        it("no bounds", () => {
            const result = drawingToPoints(getMockRectangleNoBounds());
            expect(result).toEqual(null);
        });
    });

    describe("Circle", () => {
        it("basic", () => {
            const result = drawingToPoints(getMockCircleBasic());
            expect(result).toEqual([
                { x: 40.7589, y: -73.9851 }, // center
                { x: 1000, y: null }, // radius with null y
            ]);
        });

        it("no center", () => {
            const result = drawingToPoints(getMockCircleNoCenter());
            expect(result).toEqual(null);
        });
    });

    describe("Polygon", () => {
        it("basic", () => {
            const result = drawingToPoints(getMockPolygonBasic());

            expect(result).toEqual([
                { x: 40.7589, y: -73.9851 },
                { x: 40.7629, y: -73.9801 },
                { x: 40.7569, y: -73.9801 },
            ]);
        });

        it("empty", () => {
            const result = drawingToPoints(getMockPolygonEmpty());

            expect(result).toEqual([]);
        });
    });

    describe("Unknown", () => {
        it("unknown object input", () => {
            const result = drawingToPoints(getMockUnknownShape());
            expect(result).toEqual(null);
        });

        it("null/undefined input", () => {
            expect(drawingToPoints(pretendValid(null))).toEqual(null);
            expect(drawingToPoints(pretendValid(undefined))).toEqual(null);
        });

        it("non-object input", () => {
            expect(drawingToPoints(pretendValid("string"))).toEqual(null);
            expect(drawingToPoints(pretendValid(123))).toEqual(null);
            expect(drawingToPoints(pretendValid(true))).toEqual(null);
        });
    });

    describe("Edge cases", () => {
        it("Rectangle (invalid bounds)", () => {
            const result = drawingToPoints(getMockRectangleInvalidBounds());
            expect(result).toEqual(null);
        });

        it("Circle (invalid center)", () => {
            const result = drawingToPoints(getMockCircleInvalidCenter());
            expect(result).toEqual(null);
        });
    });
});
