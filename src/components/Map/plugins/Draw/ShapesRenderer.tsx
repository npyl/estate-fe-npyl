import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { DrawShape, StopDraw } from "../../types";
import setShapeEvents from "../../util/draw/setShapeEvents";
import { drawingToPoints, drawShape } from "../../util";
import { TShape } from "@/types/shape";
import { useMapContext } from "../../Main/context";
import { TDrawMode } from "./types";

// ---------------------------------------------------------------------------

const removeShape = (s: DrawShape | StopDraw) => s?.setMap(null);

const drawShapes = (
    shapes: TShape[],
    map: google.maps.Map,
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void
) => shapes.map((s) => drawShape(s, map, onShapeChange));

// ---------------------------------------------------------------------------

interface ShapesRendererRef {
    load: VoidFunction;
    draw: (ov: DrawShape) => void;
    clear: VoidFunction;
}

interface ShapesRendererProps {
    mode: TDrawMode;
    shapes: TShape[];
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

const ShapesRenderer = forwardRef<ShapesRendererRef, ShapesRendererProps>(
    ({ mode, shapes, onShapeChange }, ref) => {
        const { mapRef } = useMapContext();
        const shapesRef = useRef<DrawShape[] | StopDraw>(null);

        /**
         * Renders shapes that are passed as prop
         */
        const load = useCallback(() => {
            if (!mapRef.current) return;
            clear();

            shapesRef.current = drawShapes(
                shapes,
                mapRef.current,
                onShapeChange
            ) as any;
        }, [shapes, onShapeChange]);

        /**
         * Renders an google.map.event.overlay
         */
        const draw = useCallback(
            (ov: DrawShape) => {
                let old: TShape | undefined;
                const shape = drawingToPoints(ov);

                if (mode === "MULTIPLE") {
                    old = drawingToPoints(ov);

                    shapesRef.current?.push(ov);
                } else if (mode === "SINGLE") {
                    const hasOld =
                        Array.isArray(shapesRef.current) &&
                        shapesRef.current.length === 1;

                    old = hasOld
                        ? drawingToPoints(shapesRef.current?.[0]!)
                        : shape;

                    clear();
                    shapesRef.current = [ov];
                }

                const cb = () => onShapeChange?.(old!, shape);
                setShapeEvents(ov, cb);
            },
            [onShapeChange]
        );

        /**
         * Clears all shapes from the map view
         */
        const clear = useCallback(() => {
            shapesRef.current?.forEach(removeShape);
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                load,
                draw,
                clear,
            }),
            [draw, clear]
        );

        // Unmount
        useEffect(() => {
            return () => {
                clear();
            };
        }, []);

        return null;
    }
);

export type { ShapesRendererRef };
export default ShapesRenderer;
