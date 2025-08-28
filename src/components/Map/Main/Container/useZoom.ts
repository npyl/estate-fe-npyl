import { TShape } from "@/types/shape";
import getZoomFromShape from "@/components/Map/util/zoom";
import { useMemo } from "react";
import { ZOOM_LEVELS } from "../../constants";

// INFO: priority: 1st: shape, 2nd: explicitly set value `zoom` (or GREECE_BULGARIA_ZOOM fallback)
const useZoom = (shapes: TShape[] = [], zoom: number = ZOOM_LEVELS.DEFAULT) => {
    const shape = shapes?.at(0);
    return useMemo(() => {
        if (shape) return getZoomFromShape(shape);
        return zoom;
    }, [shape, zoom]);
};

export default useZoom;
