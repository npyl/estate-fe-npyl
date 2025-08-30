import { TShape } from "@/types/shape";
import areShapesEqual from "@/components/Map/util/draw/areShapesEqual";

describe("areShapesEqual", () => {
    it("empty shapes", () => {
        const s0: TShape = [];
        const s1: TShape = [];
        expect(areShapesEqual(s0, s1)).toBe(true);
    });

    it("different lengths", () => {
        const s0: TShape = [{ x: 1, y: 2 }];
        const s1: TShape = [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
        ];
        expect(areShapesEqual(s0, s1)).toBe(false);
    });

    describe("circle", () => {
        it("same radius", () => {
            const s0: TShape = [{ x: 5, y: null }];
            const s1: TShape = [{ x: 5, y: null }];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("different radius", () => {
            const s0: TShape = [{ x: 5, y: null }];
            const s1: TShape = [{ x: 10, y: null }];
            expect(areShapesEqual(s0, s1)).toBe(false);
        });

        it("same radii (different order)", () => {
            const s0: TShape = [
                { x: 5, y: null },
                { x: 10, y: null },
                { x: 15, y: null },
            ];
            const s1: TShape = [
                { x: 15, y: null },
                { x: 5, y: null },
                { x: 10, y: null },
            ];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("different radii", () => {
            const s0: TShape = [
                { x: 5, y: null },
                { x: 10, y: null },
            ];
            const s1: TShape = [
                { x: 5, y: null },
                { x: 15, y: null },
            ];
            expect(areShapesEqual(s0, s1)).toBe(false);
        });

        it("circle with non-circle", () => {
            const s0: TShape = [{ x: 5, y: null }];
            const s1: TShape = [{ x: 5, y: 10 }];
            expect(areShapesEqual(s0, s1)).toBe(false);
        });

        it("mixed circle and non-circle points", () => {
            const s0: TShape = [
                { x: 5, y: null },
                { x: 10, y: 15 },
            ];
            const s1: TShape = [
                { x: 5, y: 10 },
                { x: 10, y: null },
            ];
            expect(areShapesEqual(s0, s1)).toBe(false);
        });
    });

    describe("Non-circle shapes", () => {
        it("identical points", () => {
            const s0: TShape = [
                { x: 1, y: 2 },
                { x: 3, y: 4 },
                { x: 5, y: 6 },
            ];
            const s1: TShape = [
                { x: 1, y: 2 },
                { x: 3, y: 4 },
                { x: 5, y: 6 },
            ];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("same points in different order", () => {
            const s0: TShape = [
                { x: 1, y: 2 },
                { x: 3, y: 4 },
                { x: 5, y: 6 },
            ];
            const s1: TShape = [
                { x: 5, y: 6 },
                { x: 1, y: 2 },
                { x: 3, y: 4 },
            ];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("different points", () => {
            const s0: TShape = [
                { x: 1, y: 2 },
                { x: 3, y: 4 },
            ];
            const s1: TShape = [
                { x: 1, y: 2 },
                { x: 3, y: 5 }, // Different y value
            ];
            expect(areShapesEqual(s0, s1)).toBe(false);
        });

        it("single identical point", () => {
            const s0: TShape = [{ x: 10, y: 20 }];
            const s1: TShape = [{ x: 10, y: 20 }];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("single different point", () => {
            const s0: TShape = [{ x: 10, y: 20 }];
            const s1: TShape = [{ x: 10, y: 21 }];
            expect(areShapesEqual(s0, s1)).toBe(false);
        });

        it("duplicate points", () => {
            const s0: TShape = [
                { x: 1, y: 2 },
                { x: 1, y: 2 },
                { x: 3, y: 4 },
            ];
            const s1: TShape = [
                { x: 1, y: 2 },
                { x: 3, y: 4 },
                { x: 1, y: 2 },
            ];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("should handle circle with zero radius", () => {
            const s0: TShape = [{ x: 0, y: null }];
            const s1: TShape = [{ x: 0, y: null }];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });

        it("should handle duplicate radii in circles", () => {
            const s0: TShape = [
                { x: 5, y: null },
                { x: 5, y: null },
                { x: 10, y: null },
            ];
            const s1: TShape = [
                { x: 10, y: null },
                { x: 5, y: null },
                { x: 5, y: null },
            ];
            expect(areShapesEqual(s0, s1)).toBe(true);
        });
    });
});
