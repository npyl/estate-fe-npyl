"use client";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ICarouselImage from "src/components/carousel/types";
import CarouselSimple from "src/components/CarouselSimple";
import BedIcon from "@mui/icons-material/Bed";
import RoomIcon from "@mui/icons-material/Room";
import { Label } from "src/components/label";
import { IPropertyResultResponse } from "src/types/properties";
import { Bathroom, House } from "@mui/icons-material";

// ----------------------------------------------------------------------

type BookingItemProps = {
    item: IPropertyResultResponse;
    activeMarker?: number;
};

const ForSaleLabel = () => {
    return (
        <Box
            borderRadius={1}
            sx={{
                position: "absolute",
                top: 4,
                left: 4,
                backgroundColor: "rgb(235, 0, 0)",
                color: "white",
                zIndex: 9999,
                p: 1,
            }}
            textAlign={"center"}
            height={40}
        >
            <Typography>For Sale</Typography>
        </Box>
    );
};

const TypeLabel = ({ value }: { value: string }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                left: 4,
                bottom: 4,
            }}
        >
            <Label opaque color="warning">
                {value} €
            </Label>
        </Box>
    );
};

const PriceLabel = ({ value }: { value: number }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                right: 4,
                bottom: 4,
            }}
        >
            <Label opaque color="success">
                {value} €
            </Label>
        </Box>
    );
};

export const BookingItem = ({ item, activeMarker }: BookingItemProps) => {
    const {
        details,
        price,
        location,
        images,
        id,
        area,
        parentCategory,
        state,
    } = item;

    const router = useRouter();

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
        <Paper
            sx={{
                position: "relative",

                mt: 2,
                mx: 1.5,
                pb: 2,
                border: 0,
                borderRadius: 1,

                boxShadow:
                    item.id === activeMarker
                        ? `rgba(0, 0, 0, 0.30) 0px 5px 15px`
                        : `rgba(0, 0, 0, 0.10) 0px 5px 15px`,

                "&:hover": {
                    cursor: "pointer",
                    boxShadow: `rgba(0, 0, 0, 0.30) 0px 5px 15px`,
                },
            }}
        >
            {state === "Sale" && <ForSaleLabel />}

            <Box sx={{ position: "relative" }}>
                <CarouselSimple
                    onImageClick={() => router.push(`property/${id}`)}
                    data={_carouselImages}
                />
            </Box>

            <Stack
                direction="column"
                gap={1}
                p={1}
                pb={3}
                onClick={() => router.push(`property/${id}`)}
            >
                <Stack direction="row" flex={1} flexWrap={"nowrap"}>
                    <Stack direction={"row"} flex={1} gap={1}>
                        <House color={"action"} fontSize="small" />
                        <Typography variant="body2">{area} m²</Typography>
                    </Stack>
                    <Stack direction={"row"} flex={1} gap={1}>
                        <BedIcon color={"action"} fontSize="small" />
                        <Typography variant="body2">
                            {details?.bedrooms}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={1}>
                        <Bathroom color={"action"} fontSize="small" />
                        <Typography variant="body2">
                            {details?.bathrooms}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" flex={1} flexWrap={"nowrap"} gap={1}>
                    <RoomIcon color="action" fontSize="small" />
                    <Typography color={"text.secondary"} variant="body1">
                        {location?.street} {location?.number},{" "}
                        {location?.zipCode}
                    </Typography>
                </Stack>
                <Divider />
            </Stack>

            <TypeLabel value={parentCategory} />
            <PriceLabel value={price} />
        </Paper>
    );
};
