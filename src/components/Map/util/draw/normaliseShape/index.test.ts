import normaliseShape from ".";

const CIRCLE0 = [
    { x: 10, y: 5 },
    { x: 15, y: null },
];

const CIRCLE1 = [
    { x: 10, y: 5 },
    { x: 15, y: 0.0 },
];

const getBeforeAfter = (SHAPE: any) => {
    const res = normaliseShape(SHAPE);
    const before = JSON.stringify(SHAPE);
    const after = JSON.stringify(res);
    return { before, after };
};

describe("normaliseShape", () => {
    test("pre-normalised", () => {
        const { before, after } = getBeforeAfter(CIRCLE0);
        expect(before).toBe(after);
    });
    test("non-normalised", () => {
        const { before, after } = getBeforeAfter(CIRCLE1);
        expect(before).not.toBe(after);
    });
});
