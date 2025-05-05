import { FC, PropsWithChildren, useCallback, useMemo, useRef } from "react";
import Map from "@/components/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { drawingToPoints, getShapeCenter } from "@/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import { TShape } from "@/types/shape";
import { ZOOM_LEVELS } from "@/components/Map/constants";
import {
    useFiltersContext,
    usePoints,
} from "@/sections/Properties/FiltersContext";

const MapFilter: FC<PropsWithChildren> = ({ children }) => {
    const mapRef = useRef<google.maps.Map>();
    const setRef = useCallback(
        (m: google.maps.Map) => (mapRef.current = m),
        []
    );

    const { setPoints, resetPoints } = useFiltersContext();

    const handleDraw = useCallback((shape: DrawShape | StopDraw) => {
        if (shape) {
            setPoints(drawingToPoints(shape));
        } else {
            resetPoints();
        }
    }, []);

    const handleChange = useDebouncedCallback((_: any, newShape: TShape) => {
        setPoints(newShape);
    }, 150);

    const shape = usePoints();
    const center = useMemo(() => getShapeCenter(shape), [shape]);
    const zoom = shape ? ZOOM_LEVELS.REGION : ZOOM_LEVELS.DEFAULT;

    return (
        <Map
            onReady={setRef}
            drawing
            zoom={zoom}
            shapes={[shape]}
            center={center}
            onDraw={handleDraw}
            onShapeChange={handleChange}
        >
            {children}
        </Map>
    );
};

export default MapFilter;
