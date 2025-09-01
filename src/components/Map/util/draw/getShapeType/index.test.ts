import getShapeType, {
    TShapeType,
} from "@/components/Map/util/draw/getShapeType";
import { TShape } from "@/types/shape";

const CIRCLE = [
    { x: 10, y: 5 },
    { x: 15, y: null },
];

const RECTANGLE = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
];
const RECTANGLE_W_NULL_POINT = [
    { x: 0, y: 0 },
    { x: 10, y: null },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
];

const POLYGON = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 7, y: 3 },
    { x: 3, y: 5 },
    { x: 0, y: 3 },
];
const POLYGON_W_NULL_POINT = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 7, y: null },
    { x: 3, y: 5 },
    { x: 0, y: 3 },
];

const EMPTY: TShape = [];

const SINGLE_POINT = [{ x: 10, y: 5 }];

const THREE_POINTS = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 2, y: 3 },
];

describe("getShapeType", () => {
    test("Circle", () => {
        expect(getShapeType(CIRCLE)).toBe<TShapeType>("Circle");
    });

    test("Rectangle", () => {
        expect(getShapeType(RECTANGLE)).toBe<TShapeType>("Rectangle");
    });

    test("Polygon", () => {
        expect(getShapeType(POLYGON)).toBe<TShapeType>("Polygon");
    });

    test("Other - empty array", () => {
        expect(getShapeType(EMPTY)).toBe(null);
    });

    test("Other - single point", () => {
        expect(getShapeType(SINGLE_POINT)).toBe(null);
    });

    test("Other - three points", () => {
        expect(getShapeType(THREE_POINTS)).toBe(null);
    });

    test("Other - rectangle with null point", () => {
        expect(getShapeType(RECTANGLE_W_NULL_POINT)).toBe(null);
    });

    test("Other - polygon with null point", () => {
        expect(getShapeType(POLYGON_W_NULL_POINT)).toBe(null);
    });
});
