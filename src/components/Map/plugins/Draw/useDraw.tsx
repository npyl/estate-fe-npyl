import { useCallback, useEffect, useRef } from "react";
import { DrawShape } from "../../types";
import { useMapContext } from "../../Main/context";
import { DrawProps } from "./types";

// ---------------------------------------------------------------------------

type TUseDraw = Omit<DrawProps, "shapes" | "onClear">;

const useDraw = ({ onDraw, onShapeChange }: TUseDraw) => {
    const { mapRef } = useMapContext();
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager>();

    const onOverlayComplete = useCallback(
        (event: google.maps.drawing.OverlayCompleteEvent) => {
            if (!event.overlay) return null;

            // disable drawing mode
            drawingManagerRef.current?.setDrawingMode(null);

            const ov = event.overlay as DrawShape;

            // INFO: this is important; we remove the google-generated shape so that all shapes are rendered based on our shapes state
            ov.setMap(null);

            onDraw?.(ov);
        },
        [onDraw]
    );

    useEffect(() => {
        if (!mapRef.current) return;

        const editable = Boolean(onShapeChange);
        const draggable = Boolean(onShapeChange);

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
                editable,
                draggable,
                zIndex: 1,
            },
            rectangleOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable,
                draggable,
                zIndex: 1,
            },
            circleOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable,
                draggable,
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

        return () => {
            listener.remove();
            drawingManagerRef.current?.setMap(null);
            drawingManagerRef.current = undefined;
        };
    }, [onShapeChange, onOverlayComplete]);

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

    return {
        drawPolygon,
        drawRectangle,
        drawCircle,
    };
};

export default useDraw;
