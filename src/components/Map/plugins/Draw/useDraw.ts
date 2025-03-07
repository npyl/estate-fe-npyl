import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { DrawShape, StopDraw } from "../../types";
import setShapeEvents from "../../util/draw/setShapeEvents";
import { drawingToPoints, drawShape } from "../../util";
import { TShape } from "@/types/shape";
import { useMapContext } from "../../Main/context";
import { DrawProps } from "./types";

const removeShape = (s: DrawShape | StopDraw) => s?.setMap(null);

const drawShapes = (shapes: TShape[], map: google.maps.Map) =>
    shapes.map((s) => drawShape(s, map, null));

const useDraw = ({ mode, shapes, onDraw, onShapeChange }: DrawProps) => {
    const { mapRef } = useMapContext();
    const shapesRef = useRef<DrawShape[] | StopDraw>(null);
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager>();

    const onOverlayComplete = useCallback(
        (event: google.maps.drawing.OverlayCompleteEvent) => {
            if (!event.overlay) return null;

            const ov = event.overlay as DrawShape;

            if (mode === "MULTIPLE") {
                shapesRef.current?.push(ov);
            } else if (mode === "SINGLE") {
                shapesRef.current?.forEach(removeShape);
                shapesRef.current = [ov];
            }

            drawingManagerRef.current?.setDrawingMode(null);

            if (ov) {
                const shape = drawingToPoints(ov);
                const cb = () => onShapeChange?.([], shape);
                setShapeEvents(ov, cb);
            }

            onDraw?.(ov);
        },
        []
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

        if (shapes) {
            shapesRef.current = drawShapes(shapes, mapRef.current) as any;
        }

        return () => {
            listener.remove();
            drawingManagerRef.current?.setMap(null);
            drawingManagerRef.current = undefined;
        };
    }, []);

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
        shapesRef.current?.forEach(removeShape);
        onDraw?.(null);
    }, []);

    return {
        drawPolygon,
        drawRectangle,
        drawCircle,
        // ...
        clear,
    };
};

export default useDraw;
