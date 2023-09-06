import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import Map from "src/components/Map/Map";
import { decodeShape, drawShape } from "src/components/Map/util";
import { selectCity, selectShape, setCity } from "src/slices/customer";

interface AreaOfPreferenceProps {
    // shape: string;
}

export const AreaOfPreference: React.FC<AreaOfPreferenceProps> = ({}) => {
    const [map, setMap] = useState<google.maps.Map>();
    const shape = useSelector(selectShape); // Get shape from Redux
    const city = useSelector(selectCity);
    console.log("Map is initialized"); // Debug line
    useEffect(() => {
        if (!map) return;

        if (shape) {
            // Decode the shape string to get the shape data
            const shapeData = decodeShape(shape);
            if (!shapeData) return;

            // Draw the shape on the map
            drawShape(shapeData, map, null);

            // Center the map to the first point in the shape
            if (shapeData.type === "Polygon") {
                if (
                    shapeData.paths.length > 0 &&
                    shapeData.paths[0].length > 0
                ) {
                    const [firstPath] = shapeData.paths;
                    const [firstCoord] = firstPath;
                    const { lat, lng } = firstCoord;
                    map.setCenter(new google.maps.LatLng(lat, lng));
                }
            } else if (shapeData.type === "Circle") {
                const { lat, lng } = shapeData;
                map.setCenter(new google.maps.LatLng(lat, lng));
            } else if (shapeData.type === "Rectangle") {
                const { nelat, nelng } = shapeData;
                map.setCenter(new google.maps.LatLng(nelat, nelng));
            } else if (!shapeData) {
                return;
            }
        } else {
            // Debug lines to ensure that the map should be visible
            map.setCenter(new google.maps.LatLng(37.7749, -122.4194)); // Centering on San Francisco for example
            map.setZoom(12);
        }
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
