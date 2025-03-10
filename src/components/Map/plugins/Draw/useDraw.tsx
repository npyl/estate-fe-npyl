import { useCallback, useEffect, useRef } from "react";
import { DrawShape } from "../../types";
import { useMapContext } from "../../Main/context";
import { DrawProps } from "./types";
import ShapesRenderer, { ShapesRendererRef } from "./ShapesRenderer";

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

        shapesRendererRef.current?.load();

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

    const load = useCallback(() => shapesRendererRef.current?.load(), []);

    // ---------------------------------------------------------------------

    return {
        load,
        // ...
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
