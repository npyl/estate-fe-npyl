import FlipIcon from "@mui/icons-material/Flip";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
import InfoIcon from "@mui/icons-material/Info";
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

    const [orientation, setOrientation] = useState(false); // true -> vertical, false -> horizontal

    // filter only properties with valid location.{lat,lng}
    const nonNullProperties = useMemo(
        () => data.filter((p) => p.location?.lat && p.location?.lng),
        [data]
    );

    // properties we show
    const { properties, filtered } = useMemo(() => {
        if (!!selectedMarker)
            return {
                properties: nonNullProperties,
                filtered: nonNullProperties,
            };

        if (!encodedShape) {
            return { properties: nonNullProperties, filtered: [] }; // No shape, no filtered properties
        }

        const shape = decodeShape(encodedShape);
        if (!shape) {
            return { properties: nonNullProperties, filtered: [] }; // Invalid shape, no filtered properties
        }

        // Properties within the drawn shape
        const filteredProperties = nonNullProperties.filter((p) =>
            isPointInsideShapeData(p.location.lat!, p.location.lng!, shape)
        );

        // If filtered is not empty, properties should match filtered
        return {
            properties:
                filteredProperties.length > 0
                    ? filteredProperties
                    : nonNullProperties,
            filtered: filteredProperties,
        };
    }, [selectedMarker, nonNullProperties, encodedShape]);

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
                        onMarkerClick={setSelectedMarker}
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
                    {filtered.length > 0 && (
                        <Grid container>
                            {properties.map((item, index) => (
                                <Grid
                                    mb={1}
                                    key={index}
                                    item
                                    xs={12}
                                    sm={orientation ? 12 : 6}
                                    sx={{
                                        backgroundColor: "background.default", // Use theme background color
                                    }}
                                >
                                    {orientation ? (
                                        <HorizontalCard
                                            activeMarker={activeMarker || -1}
                                            item={item}
                                            selectedMarker={selectedMarker}
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
                    )}

                    {filtered.length === 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column", // Changed to 'column' to stack icon and text
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 3, // Increased padding for more space
                                backgroundColor: "background.default", // Use theme background color
                                textAlign: "center",
                                height: "100%", // Full height of the parent container
                                gap: 2, // space between icon and text
                            }}
                        >
                            <InfoIcon
                                sx={{
                                    color: "primary.main", // Use theme primary color
                                    fontSize: "3rem", // makes the icon larger
                                }}
                            />
                            <Typography
                                variant="subtitle1" // Suitable for informative text
                                component="div"
                                sx={{
                                    color: "text.primary", // Use theme primary text color
                                    fontWeight: "medium", // Medium weight for the text
                                    // other styles here as needed
                                }}
                            >
                                Draw or drag to a location that has markers
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Box>
        </>
    );
};
export default MapView;
