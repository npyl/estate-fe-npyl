import { TPoint, TShape } from "@/types/shape";

type TShapeType = "Circle" | "Rectangle" | "Polygon";

const isNullPoint = (p: TPoint) => Boolean(p.x) && !p.y;

const isNonNullShape = (s: TShape) => {
    if (s.some(isNullPoint)) return false;
    return true;
};

const getShapeType = (s: TShape): TShapeType | null => {
    if (s.length === 2 && s[1].y === null) return "Circle";
    if (s.length === 4 && isNonNullShape(s)) return "Rectangle";
    if (s.length > 4 && isNonNullShape(s)) return "Polygon";
    return null;
};

export default getShapeType;
