import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Map from "src/components/Map/Map";
import { decodeShape, drawShape } from "src/components/Map/util";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useGetMunicipalitiesQuery } from "src/services/location";

interface AreaOfPreferenceProps {
    index: number; // index of demand
}

const isNumberString = (input: string): boolean => !isNaN(Number(input));

export const AreaOfPreference: React.FC<AreaOfPreferenceProps> = ({
    index,
}) => {
    const router = useRouter();
    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);

    const demand = useMemo(() => data?.demands[index], [data?.demands[index]]);
    const demandFilters = useMemo(() => demand?.filters, [demand?.filters]);

    const regions = useMemo(
        () => demandFilters?.regions || [],
        [demandFilters?.regions]
    );
    const cities = useMemo(
        () => demandFilters?.cities || [],
        [demandFilters?.cities]
    );
    const shape = useMemo(() => demand?.shape, [demand?.shape]);
    const shapeData = useMemo(
        () => (shape ? decodeShape(shape) : null),
        [shape]
    );

    const { data: municips } = useGetMunicipalitiesQuery(+regions[0], {
        skip: !regions[0] && !isNumberString(regions[0]),
    });

    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (!map) return;

        if (shapeData) {
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
    }, [shapeData, index, map]);

    return (
        <Box height={`calc(100vh - 266px)`} width={"100%"}>
            <Map
                key={index}
                zoom={12}
                // shape={shapeData || undefined}
                onReady={(m) => setMap(m)}
                drawing={false}
                activeMarker={null}
                setActiveMarker={() => {}}
            />
        </Box>
    );
};
