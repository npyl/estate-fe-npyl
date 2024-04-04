"use client";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import ICarouselImage from "src/components/carousel/types";
import CarouselSimple from "src/components/CarouselSimple";
import { IPropertyResultResponse } from "src/types/properties";
import { IMapMarker } from "src/components/Map/Map";
import Iconify from "src/components/iconify";

type BookingItemProps = {
    item: IPropertyResultResponse;
    activeMarker?: number;
    selectedMarker: IMapMarker | null;
};

function truncate(str: string = "", n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const defaultImage = "/static/noImage.png";

function HorizontalCard({
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

    const convertedImages = useMemo(
        () =>
            images.map((url, index) => ({
                id: index,
                url: url || defaultImage,
                title: "",
            })) || [],
        [images]
    );

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
                    data={convertedImages}
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

export default HorizontalCard;
