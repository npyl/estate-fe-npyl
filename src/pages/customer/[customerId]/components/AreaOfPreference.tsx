import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import Map from "src/components/Map/Map";
import { decodeShape, drawShape } from "src/components/Map/util";

interface AreaOfPreferenceProps {
    shape: string;
}

export const AreaOfPreference: React.FC<AreaOfPreferenceProps> = ({
    shape,
}) => {
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (!shape || !map) return;

        const shapeData = decodeShape(shape);
        if (!shapeData) return;

        shapeData && drawShape(shapeData, map, null);
    }, [shape, map]);

    return (
        <Box height={`calc(100vh - 266px)`} width={"100%"}>
            <Map
                zoom={12}
                onReady={(m) => setMap(m)}
                drawing={false}
                activeMarker={null}
                setActiveMarker={() => {}}
            />
        </Box>
    );
};
