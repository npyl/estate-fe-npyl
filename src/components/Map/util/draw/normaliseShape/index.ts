import { TShape } from "@/types/shape";

/**
 * This method is REALLY important! Backend has asked us to treat a 0.0 value as null; This is important for circles where y is null for radius.
 * @param s a shape as received from Backend
 */
const normaliseShape = (s: TShape) => {
    if (s.length === 2 && s[1].y === 0.0)
        return [
            { x: s[0].x, y: s[0].y },
            { x: s[1].x, y: null },
        ];

    return s;
};

export default normaliseShape;
