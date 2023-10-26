import FlipIcon from "@mui/icons-material/Flip";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import {
    decodeShape,
    encodeShape,
    isPointInsideShapeData,
} from "src/components/Map/util";
import { IPropertyResultResponse } from "src/types/properties";
import { useDebouncedCallback } from "use-debounce";

import { BookingItem } from "./BookingItem";
import { HorizontalCard } from "./HorizontalCard";

interface Props {
    data: IPropertyResultResponse[];
}

const MapView = ({ data }: Props) => {
    const [encodedShape, setEncodedShape] = useState<string>();

    const [activeMarker, setActiveMarker] = useState(null);
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: 37.98381,
        lng: 23.727539,
    });
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(
        null
    );

    const [orientation, setOrientation] = useState(false); // true -> vertical, false -> horizontal)

    // filter only properties with valid location.{lat,lng}
    const nonNullProperties = useMemo(
        () => data.filter((p) => p.location?.lat && p.location?.lng),
        [data]
    );

    // properties we show
    const properties = useMemo(() => {
        if (!encodedShape) return nonNullProperties;

        /* INFO: encode & decode shape so that changes to string object can be caught from useMemo */
        const shape = decodeShape(encodedShape);
        if (!shape) return nonNullProperties;

        const filtered = nonNullProperties.filter((p) =>
            isPointInsideShapeData(p.location.lat!, p.location.lng!, shape)
        );

        return filtered.length > 0 ? filtered : nonNullProperties;
    }, [nonNullProperties, encodedShape]);

    // respective markers
    const markers: IMapMarker[] = useMemo(
        () =>
            properties.map(({ location }) => ({
                lat: location.lat!,
                lng: location.lng!,
            })),
        [properties]
    );

    const toggleOrientation = () => setOrientation(!orientation);

    const handleDraw = (shape: DrawShape | StopDraw) =>
        setEncodedShape(shape ? encodeShape(shape) : "");
    const handleChange = useDebouncedCallback(
        (oldEncodedShape: string, newEncodedShape: string) =>
            setEncodedShape(newEncodedShape),
        150
    );

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        let newMarker = mainMarker;
        newMarker.lat = lat;
        newMarker.lng = lng;
        setMainMarker(newMarker);
    };

    const handleSearchSelect = (
        address: IMapAddress,
        lat: number,
        lng: number
    ) => {
        if (!lat || !lng) return;

        updateMainMarkerCoordinates(lat, lng);
    };

    return (
        <>
            <Box display={"flex"}>
                <Box height={`calc(100vh - 266px)`} width={"50%"}>
                    <Map
                        search
                        mainMarker={mainMarker}
                        activeMarker={activeMarker}
                        setActiveMarker={setActiveMarker}
                        onMarkerClick={(marker) => {
                            setSelectedMarker(marker);
                        }}
                        markers={markers}
                        onDraw={handleDraw}
                        onShapeChange={handleChange}
                        onSearchSelect={handleSearchSelect}
                    />
                </Box>

                <Stack
                    height={`calc(100vh - 282px)`}
                    sx={{ overflowY: "auto" }}
                    marginY={1}
                    spacing={1}
                    width={"50%"}
                >
                    <Stack direction={"row"}>
                        <Box flex={1}></Box>
                        <Button
                            onClick={toggleOrientation}
                            sx={{ width: 30, justifyContent: "right" }}
                        >
                            <FlipIcon />
                        </Button>
                    </Stack>

                    <Grid container>
                        {properties.map((item, index) => (
                            <Grid
                                mb={1}
                                key={index}
                                item
                                xs={12}
                                sm={orientation ? 12 : 6}
                            >
                                {orientation ? (
                                    <HorizontalCard
                                        activeMarker={activeMarker || -1}
                                        item={item}
                                        selectedMarker={selectedMarker} // add this line
                                    />
                                ) : (
                                    <BookingItem
                                        activeMarker={activeMarker || -1}
                                        item={item}
                                        selectedMarker={selectedMarker}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Box>
        </>
    );
};
export default MapView;
