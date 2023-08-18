import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Map from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { decodeShape, encodeShape } from "src/components/Map/util";
import { selectShape, setShape } from "src/slices/customer";

export const AreaOfPreference = () => {
    const dispatch = useDispatch();

    const shape = useSelector(selectShape);
    const shapeData = useMemo(
        () => (shape ? decodeShape(shape) : null),
        [shape]
    );

    const handleDraw = (s: DrawShape | StopDraw) => {
        const encoded = s ? encodeShape(s) : null;
        dispatch(setShape(encoded));
    };

    return (
        <Box height={`calc(100vh - 266px)`} width={"100%"}>
            <Map
                zoom={7}
                drawing
                shape={shapeData || undefined}
                onDraw={handleDraw}
                activeMarker={null}
                setActiveMarker={() => {}}
            />
        </Box>
    );
};
