import FlipIcon from "@mui/icons-material/Flip";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import CarouselSimple from "src/components/CarouselSimple";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { isPointInsideShape } from "src/components/Map/util";
import ICarouselImage from "src/components/carousel/types";
import Iconify from "src/components/iconify";
import { IPropertyResultResponse } from "src/types/properties";
import { BookingItem } from "./BookingItem";

interface Props {
    data: IPropertyResultResponse[];
}

const MapView = ({ data }: Props) => {
    const [shape, setShape] = useState<DrawShape | StopDraw>();

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
        if (!shape) return nonNullProperties;

        const filtered = nonNullProperties.filter((p) =>
            isPointInsideShape(p.location.lat!, p.location.lng!, shape)
        );

        return filtered.length > 0 ? filtered : nonNullProperties;
    }, [nonNullProperties, shape]);

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
        setShape(JSON.parse(JSON.stringify(shape)));

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
                        onDrag={(oldShape, newShape) => handleDraw(newShape)}
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
    const itemRef = useRef<HTMLDivElement | null>(null);
    const isActive =
        item.location.lat === selectedMarker?.lat &&
        item.location.lng === selectedMarker?.lng;

    useEffect(() => {
        if (isActive && itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isActive]);

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
    function truncate(str: string, n: number) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <Grid
            padding={2}
            component={Paper}
            ref={itemRef}
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
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        {truncate(description, 40)}
                    </Typography>
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
