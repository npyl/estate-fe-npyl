import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Map from "src/components/Map/Map";
import { decodeShape, drawShape } from "src/components/Map/util";
import { useGetMunicipalitiesQuery } from "src/services/location";
import {
    selectDemandCities,
    selectDemandRegions,
    selectShape,
} from "src/slices/customer";

interface AreaOfPreferenceProps {}

const isNumberString = (input: string): boolean => !isNaN(Number(input));

export const AreaOfPreference: React.FC<AreaOfPreferenceProps> = ({}) => {
    const [map, setMap] = useState<google.maps.Map>();
    
    const shape = useSelector(selectShape); // Get shape from Redux
    
    const regions = useSelector(selectDemandRegions) || [];
    const cities = useSelector(selectDemandCities) || [];

    const { data: municips } = useGetMunicipalitiesQuery(+regions[0], {
        skip: !regions[0] && !isNumberString(regions[0]),
    });

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
            if (!cities[0]) return;
            const city = municips?.filter((m) => m.areaID === +cities[0])[0];
            // Debug lines to ensure that the map should be visible
            map.setCenter(
                new google.maps.LatLng(city?.latitude!, city?.longitude!)
            ); // Centering on San Francisco for example
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
