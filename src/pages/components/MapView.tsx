import { Button, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { BookingItem } from "./BookingItem";
import { IPropertyResultResponse } from "src/types/properties";
import { useRouter } from "next/router";
import Iconify from "src/components/iconify";
import ICarouselImage from "src/components/carousel/types";
import CarouselSimple from "src/components/CarouselSimple";
import FlipIcon from "@mui/icons-material/Flip";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { isPointInsideShape } from "src/components/Map/util";

interface Props {
    data: IPropertyResultResponse[];
}

const MapView = ({ data }: Props) => {
    const [shape, setShape] = useState<DrawShape | StopDraw>();

    const [activeMarker, setActiveMarker] = useState(null);
    const [orientation, setOrientation] = useState(false); // true -> vertical, false -> horizontal)
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(
        null
    );

    const properties = useMemo(
        () =>
            shape
                ? data.filter(
                      (property) =>
                          property.location?.lat &&
                          property.location?.lng &&
                          isPointInsideShape(
                              property.location.lat,
                              property.location.lng,
                              shape
                          )
                  )
                : data.filter(
                      (p) => p.location?.lat && p.location?.lng // filter nulls
                  ),
        [data, shape]
    );

    const markers: IMapMarker[] = useMemo(
        () =>
            properties.map(({ location }) => ({
                lat: location?.lat!,
                lng: location?.lng!,
            })),
        [properties]
    );

    const toggleOrientation = () => setOrientation(!orientation);

    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: 37.98381,
        lng: 23.727539,
    });

    const handleDraw = (shape: DrawShape | StopDraw) => {
        setShape(shape);
    };

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
                            console.log(
                                "Selected Marker set in MapView:",
                                marker
                            );
                        }}
                        markers={markers}
                        onDraw={handleDraw}
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

type BookingItemProps = {
    item: IPropertyResultResponse;
    activeMarker?: number;
    selectedMarker: IMapMarker | null; // add this line
};

export function HorizontalCard({
    item,
    activeMarker,
    selectedMarker,
}: BookingItemProps) {
    const {
        plotArea,
        parentCategory,
        description,
        details,
        price,
        location,
        images,
        id,
        area,
    } = item;

    const pricePerSqm = price / area;

    const router = useRouter();
    const isActive =
        item.location.lat === selectedMarker?.lat &&
        item.location.lng === selectedMarker?.lng;

    console.log("IsActive for Item:", item.id, isActive);
    useEffect(() => {
        console.log(
            "Selected Marker changed in HorizontalCard:",
            selectedMarker
        );
    }, [selectedMarker]);
    const _carouselImages: ICarouselImage[] = useMemo(() => {
        return images && images.length > 0
            ? images.map((image, index) => ({
                  id: `${index}`,
                  title: "Image",
                  image: image,
                  description: "",
                  path: "/repository",
              }))
            : [];
    }, [images]);

    return (
        <Grid
            component={Paper}
            sx={{
                mt: 2,
                mx: 1.5,
                border: 0,
                borderRadius: 1,
                boxShadow: isActive
                    ? `rgba(0, 0, 0, 0.65) 0px 5px 15px`
                    : `rgba(0, 0, 0, 0.25) 0px 5px 15px`,
                fontWeight: isActive ? "bold" : "normal",
                "&:hover": {
                    cursor: "pointer",
                    boxShadow: `rgba(0, 0, 0, 0.65) 0px 5px 15px`,
                },
            }}
            container
            direction={"row"}
        >
            <Grid xs={4} sx={{ position: "relative" }}>
                <CarouselSimple
                    ratio="1/1"
                    onImageClick={() => router.push(`property/${id}`)}
                    data={_carouselImages}
                />
            </Grid>
            <Grid
                xs={8}
                sx={{ p: 2, background: "white" }}
                onClick={() => router.push(`property/${id}`)}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems={"center"}
                    spacing={1}
                >
                    <Typography
                        variant="h5"
                        width={"100%"}
                        style={{
                            fontWeight:
                                item.id === activeMarker ? "bold" : "normal",
                        }}
                    >
                        {parentCategory.value}
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                        <Typography variant="body1">{area}m&sup2;</Typography>
                    </Stack>
                </Stack>

                <Typography color={"text.secondary"} variant="body1" mb={2}>
                    {location?.street} {location?.number}, {location?.zipCode}
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems={"center"}
                    spacing={1}
                    mb={3}
                >
                    <Typography variant="body2">{description}</Typography>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems={"center"}
                    spacing={5}
                    mb={2}
                >
                    <Stack direction={"row"} spacing={1}>
                        <Iconify icon={"ph:bed"} />
                        <Typography variant="body2">
                            {details?.floor.value}
                        </Typography>
                    </Stack>

                    <Stack direction={"row"} spacing={1}>
                        <Iconify icon={"ph:bed"} />
                        <Typography variant="body2">
                            {details?.bedrooms}
                        </Typography>
                    </Stack>

                    <Stack direction={"row"} spacing={1}>
                        <Iconify icon={"mdi:bathroom"} />
                        <Typography variant="body2">
                            {details?.bathrooms}
                        </Typography>
                    </Stack>

                    {parentCategory.key === "LAND" && (
                        <Stack direction={"row"} spacing={1}>
                            <Typography variant="body1">Οικόπεδο: </Typography>
                            <Typography variant="body1">
                                {plotArea} m&sup2;
                            </Typography>
                        </Stack>
                    )}
                </Stack>

                <Stack direction={"row"} spacing={5}>
                    <Typography variant="h6">{price}€</Typography>
                    <Typography variant="h6">
                        {Number.isInteger(pricePerSqm)
                            ? pricePerSqm
                            : pricePerSqm.toFixed(1)}
                        €/m&sup2;
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}
