import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import Map from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { encodeShape } from "src/components/Map/util";
import { setShape } from "src/slices/customer";

export const AreaOfPreference = () => {
    const dispatch = useDispatch();

    // TODO: getting and showing shape from BE

    const handleDraw = (s: DrawShape | StopDraw) => {
        const encoded = s ? encodeShape(s) : null;
        dispatch(setShape(encoded));
    };

    return (
        <Box height={`calc(100vh - 266px)`} width={"100%"}>
            <Map
                zoom={7}
                drawing
                onDraw={handleDraw}
                activeMarker={null}
                setActiveMarker={() => {}}
            />
        </Box>
    );
};
