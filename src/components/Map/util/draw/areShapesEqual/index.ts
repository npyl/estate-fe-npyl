import { TShape } from "@/types/shape";

/**
 * Checks if two shapes are equal
 * @param s0 First shape
 * @param s1 Second shape
 * @returns Boolean indicating whether the shapes are equal
 */
const areShapesEqual = (s0: TShape, s1: TShape): boolean => {
    // Different lengths means different shapes
    if (s0.length !== s1.length) {
        return false;
    }

    // Empty shapes are considered equal
    if (s0.length === 0) {
        return true;
    }

    return (
        s0.every((point0) => {
            return s1.some(
                (point1) => point0.x === point1.x && point0.y === point1.y
            );
        }) &&
        // And also check if each point in s1 exists in s0 (to ensure both directions)
        s1.every((point1) => {
            return s0.some(
                (point0) => point1.x === point0.x && point1.y === point0.y
            );
        })
    );
};

export default areShapesEqual;
