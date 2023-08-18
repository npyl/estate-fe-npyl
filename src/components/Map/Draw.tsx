import { useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { StyledButton } from "./style";
import { DrawShape, ShapeData, StopDraw } from "./types";
import { drawShape } from "./util";

interface DrawingComponentProps {
    map: any;
    shape?: ShapeData;
    onDraw: (shape: DrawShape | StopDraw) => void;
}

export const CustomDrawingComponent = ({
    map,
    shape,
    onDraw,
}: DrawingComponentProps) => {
    const drawingManagerRef = useRef<any>(null);
    const shapeRef = useRef<any>(null);
    const [drawMode, setDrawMode] = useState(false);

    // drawing manager ready
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Create a new instance of the DrawingManager
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: false,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON], // Customize the allowed drawing modes
            },
            polygonOptions: {
                // Customize polygon options
                fillColor: "cyan",
                fillOpacity: 0.35,
                strokeWeight: 2,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
            polylineOptions: {
                strokeColor: "#FF0000",
                strokeWeight: 2,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
            circleOptions: {
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                strokeWeight: 2,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
        });

        // Set the map for the DrawingManager
        drawingManager.setMap(map);

        google.maps.event.addListener(
            drawingManager,
            "overlaycomplete",
            (event: google.maps.drawing.OverlayCompleteEvent) => {
                console.log(event);

                if (!event.overlay) return null;
                if (typeof event.overlay === typeof google.maps.Marker)
                    return null;

                if (shapeRef.current) {
                    // Remove the previous shape
                    shapeRef.current.setMap(null);
                }

                const shape = event.overlay;
                shapeRef.current = shape;
                drawingManagerRef.current.setDrawingMode(null);

                // Support shape drag
                google.maps.event.addListener(shape, "dragend", () => {
                    onDraw(shape as DrawShape);
                });

                onDraw(shape as DrawShape);
            }
        );

        // Store the reference to the DrawingManager
        drawingManagerRef.current = drawingManager;

        setReady(true);

        return () => {
            // Cleanup when the component unmounts
            drawingManager.setMap(null);
        };
    }, [map]);

    useEffect(() => {
        if (!ready || !shape) return;

        // draw any imported shape
        shapeRef.current = drawShape(shape, map, onDraw);
    }, [ready]);

    const startDrawing = () => {
        if (shapeRef.current?.getMap()) {
            shapeRef.current.setMap(null);
        }

        setDrawMode(true);

        if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(
                google.maps.drawing.OverlayType.POLYGON
            );
        }
    };
    const startDrawingRect = () => {
        if (shapeRef.current?.getMap()) {
            shapeRef.current.setMap(null);
        }
        setDrawMode(true);
        if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(
                google.maps.drawing.OverlayType.RECTANGLE
            );
        }
    };
    const startDrawingCircle = () => {
        if (shapeRef.current?.getMap()) {
            shapeRef.current.setMap(null);
        }
        setDrawMode(true);
        if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(
                google.maps.drawing.OverlayType.CIRCLE
            );
        }
    };

    const stopDrawing = () => {
        setDrawMode(false);

        if (shapeRef.current?.getMap()) {
            shapeRef.current.setMap(null);
        }

        onDraw(null);
    };

    return (
        <Stack
            style={{
                position: "absolute",
                left: 10,
                top: "15vh",
            }}
        >
            <StyledButton onClick={startDrawing}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    style={{ width: "100%", height: "1.5rem" }}
                >
                    <path
                        fill="currentColor"
                        d="M230.64 49.36a32 32 0 0 0-45.26 0a31.9 31.9 0 0 0-5.16 6.76L152 48.42a32 32 0 0 0-54.63-23.06a32.06 32.06 0 0 0-5.76 37.41L57.67 93.32a32.05 32.05 0 0 0-40.31 4.05a32 32 0 0 0 42.89 47.41l70 51.36a32 32 0 1 0 47.57-14.69l27.39-77.59q1.38.12 2.76.12a32 32 0 0 0 22.63-54.62Zm-67.87 126.79a32 32 0 0 0-23 7.08l-70-51.36a32.17 32.17 0 0 0-1.34-26.65l33.95-30.55a32 32 0 0 0 45.47-10.81l28.15 7.7a32 32 0 0 0 14.12 27Z"
                    />
                </svg>
            </StyledButton>

            <StyledButton onClick={startDrawingCircle}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ width: "100%", height: "1.5rem" }}
                >
                    <path
                        fill="currentColor"
                        d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                    />
                </svg>
            </StyledButton>
            <StyledButton onClick={startDrawingRect}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ width: "100%", height: "1.5rem" }}
                >
                    <path
                        fill="currentColor"
                        d="M2 20V4h20v16H2Zm2-2h16V6H4v12Zm0 0V6v12Z"
                    />
                </svg>
            </StyledButton>

            <StyledButton onClick={stopDrawing}>
                <Typography fontSize={10}>Clear</Typography>
            </StyledButton>
        </Stack>
    );
};
