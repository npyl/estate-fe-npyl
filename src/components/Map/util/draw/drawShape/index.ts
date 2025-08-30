import { DrawShape } from "@/components/Map/types";
import { TShape } from "@/types/shape";
import drawCircle from "./circle";
import drawRectangle from "./rectangle";
import drawPolygon from "./polygon";
import normaliseShape from "@/components/Map/util/draw/normaliseShape";
import { getShapeType } from "@/components/Map/util";

/**
 * Draws a (visible) shape to a google map & returns the object that was generated
 */
const drawShape = (
    s: TShape,
    map: google.maps.Map,
    changeable: boolean
): DrawShape | null => {
    if (!s || s.length === 0) return null;

    const shape = normaliseShape(s);

    const type = getShapeType(shape);

    if (type === "Circle") return drawCircle(shape, map, changeable);

    // Check if shape is a rectangle (4 points forming a rectangle)
    if (type === "Rectangle") return drawRectangle(shape, map, changeable);

    // Otherwise, treat as polygon
    if (type === "Polygon") return drawPolygon(shape, map, changeable);

    return null;
};

export default drawShape;
