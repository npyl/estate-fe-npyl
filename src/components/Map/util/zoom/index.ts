import { TShape } from "@/types/shape";
import { isCircle } from "@/components/Map/util/is";
import { DEFAULT_ZOOM } from "./constant";
import getZoomFromCircle from "./getZoomFromCircle";
import getZoomFromNGon from "./getZoomFromNGon";

/**
 * Calculates appropriate zoom level based on the shape's geographical extent
 * Ensures zoom level is not too small to maintain good visibility
 */
const getZoomFromShape = (shape: TShape | null): number => {
    if (!shape || shape.length === 0) return DEFAULT_ZOOM;

    // Handle circle case (y is null for circles in backend)
    if (isCircle(shape)) return getZoomFromCircle(shape);

    return getZoomFromNGon(shape);
};

export default getZoomFromShape;
