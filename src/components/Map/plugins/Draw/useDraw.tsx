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
import { DrawProps, TDrawMode } from "./types";

// ---------------------------------------------------------------------------

const removeShape = (s: DrawShape | StopDraw) => s?.setMap(null);

const drawShapes = (shapes: TShape[], map: google.maps.Map) =>
    shapes.map((s) => drawShape(s, map, null));

// ---------------------------------------------------------------------------

interface ShapesRendererRef {
    render: VoidFunction;
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

        const render = useCallback(async () => {
            if (!mapRef.current) return;
            shapesRef.current = drawShapes(shapes, mapRef.current) as any;
        }, [shapes]);

        const draw = useCallback(
            (ov: DrawShape) => {
                if (mode === "MULTIPLE") {
                    shapesRef.current?.push(ov);
                } else if (mode === "SINGLE") {
                    shapesRef.current?.forEach(removeShape);
                    shapesRef.current = [ov];
                }

                const shape = drawingToPoints(ov);
                const cb = () => onShapeChange?.([], shape);
                setShapeEvents(ov, cb);
            },
            [onShapeChange]
        );

        const clear = useCallback(() => {
            shapesRef.current?.forEach(removeShape);
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                render,
                draw,
                clear,
            }),
            [render, draw, clear]
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

// ---------------------------------------------------------------------------

const useDraw = ({ mode, shapes = [], onDraw, onShapeChange }: DrawProps) => {
    const { mapRef } = useMapContext();
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager>();
    const shapesRendererRef = useRef<ShapesRendererRef>(null);

    const onOverlayComplete = useCallback(
        (event: google.maps.drawing.OverlayCompleteEvent) => {
            if (!event.overlay) return null;

            // disable drawing mode
            drawingManagerRef.current?.setDrawingMode(null);

            const ov = event.overlay as DrawShape;
            shapesRendererRef.current?.draw(ov);

            onDraw?.(ov);
        },
        [onDraw]
    );

    useEffect(() => {
        if (!mapRef.current) {
            throw "Please DONT pass an undefined mapRef";
        }

        const OPTIONS: google.maps.drawing.DrawingManagerOptions = {
            map: mapRef.current,
            drawingControl: false,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON], // Customize the allowed drawing modes
            },
            polygonOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
            rectangleOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
            circleOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
        };

        drawingManagerRef.current = new google.maps.drawing.DrawingManager(
            OPTIONS
        );

        const listener = google.maps.event.addListener(
            drawingManagerRef.current,
            "overlaycomplete",
            onOverlayComplete
        );

        shapesRendererRef.current?.render();

        return () => {
            listener.remove();
            drawingManagerRef.current?.setMap(null);
            drawingManagerRef.current = undefined;
        };
    }, [onOverlayComplete]);

    // ---------------------------------------------------------------------

    const drawPolygon = useCallback(() => {
        drawingManagerRef.current?.setDrawingMode(
            google.maps.drawing.OverlayType.POLYGON
        );
    }, []);
    const drawRectangle = useCallback(() => {
        drawingManagerRef.current?.setDrawingMode(
            google.maps.drawing.OverlayType.RECTANGLE
        );
    }, []);
    const drawCircle = useCallback(() => {
        drawingManagerRef.current?.setDrawingMode(
            google.maps.drawing.OverlayType.CIRCLE
        );
    }, []);

    // ---------------------------------------------------------------------

    const clear = useCallback(() => {
        shapesRendererRef.current?.clear();
        onDraw?.(null);
    }, [onDraw]);

    // ---------------------------------------------------------------------

    const Renderer = (
        <ShapesRenderer
            ref={shapesRendererRef}
            mode={mode}
            shapes={shapes}
            onShapeChange={onShapeChange}
        />
    );

    // ---------------------------------------------------------------------

    return {
        drawPolygon,
        drawRectangle,
        drawCircle,
        // ...
        clear,
        // ...
        Renderer,
    };
};

export default useDraw;
