import { ReactNode, useEffect, useRef, useState } from "react";
import { Button, Stack, SvgIcon, Typography, styled } from "@mui/material";
import { StyledButton } from "./style";
import { DrawShape, ShapeData, StopDraw } from "./types";
import { drawShape } from "./util";
import { IMapMarker } from "./Map";
interface SvgIconProps {
    children: ReactNode;
    [key: string]: any; // for other props you might want to pass
}
interface DrawingComponentProps {
    map: any;
    drawing: boolean;
    shape?: ShapeData;
    onDraw: (shape: DrawShape | StopDraw) => void;
}

export const CustomDrawingComponent = ({
    map,
    drawing,
    shape,
    onDraw,
}: DrawingComponentProps) => {
    const drawingManagerRef = useRef<any>(null);
    const shapeRef = useRef<DrawShape | StopDraw>(null);
    const [markers, setMarkers] = useState<IMapMarker[]>([]);
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
                shapeRef.current = shape as DrawShape;

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
        if (!ready) return;

        // draw any imported shape
        shapeRef.current?.setMap(null);
        shapeRef.current = shape
            ? drawShape(shape, map, !!drawing ? onDraw : null)
            : null;

        // INFO: we need to support null/undefined shape, because it can mean user cleared the shape OR we loaded a new map on a new demand form
    }, [ready, shape]);

    const startDrawing = () => {
        setMarkers([]);
        if (shapeRef.current?.getMap()) {
            shapeRef.current.setMap(null);
        }

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

        if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(
                google.maps.drawing.OverlayType.CIRCLE
            );
        }
    };

    const stopDrawing = () => {
        if (shapeRef.current?.getMap()) {
            shapeRef.current.setMap(null);
        }

        onDraw(null);
    };
    const StyledButton = styled(Button)({
        margin: "2px",
        padding: "3px 4px", // Reduced horizontal padding for a narrower look
        backgroundColor: "#dcdcdc", // Light gray background
        color: "#000",
        "& svg": {
            width: "24px", // A bit smaller icon size for a narrower button
            height: "24px",
        },
        "&:hover": {
            backgroundColor: "#c7c7c7", // Slightly darker gray for hover
        },
    });

    const SvgIcon = ({ children, ...props }: SvgIconProps) => (
        <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
            {children}
        </svg>
    );

    return drawing ? (
        <Stack
            style={{
                padding: 3,
                position: "absolute",
                left: 10,
                top: "15vh",
                backgroundColor: "rgba(255, 255, 255, 0.7)", // White background with opacity
                backdropFilter: "blur(10px)",
                borderRadius: "5px", // Soften the edges
            }}
        >
            <StyledButton onClick={startDrawing}>
                <SvgIcon>
                    <path
                        fill="currentColor"
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                </SvgIcon>
            </StyledButton>

            <StyledButton onClick={startDrawingCircle}>
                <SvgIcon
                    sx={{
                        width: "10px",
                    }}
                >
                    <path
                        fill="currentColor"
                        d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                    />
                </SvgIcon>
            </StyledButton>

            <StyledButton onClick={startDrawingRect}>
                <SvgIcon>
                    <path
                        fill="currentColor"
                        d="M2 20V4h20v16H2Zm2-2h16V6H4v12Zm0 0V6v12Z"
                    />
                </SvgIcon>
            </StyledButton>

            <StyledButton onClick={stopDrawing}>
                <Typography fontSize={10}>Clear</Typography>
            </StyledButton>
        </Stack>
    ) : null;
};
