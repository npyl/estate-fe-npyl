"use client";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import ICarouselImage from "src/components/carousel/types";
import CarouselSimple from "src/components/CarouselSimple";
import BedIcon from "@mui/icons-material/Bed";
import RoomIcon from "@mui/icons-material/Room";
import { Label } from "src/components/label";
import { IPropertyResultResponse } from "src/types/properties";
import { Bathroom, House } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { IMapMarker } from "src/components/Map/Map";

// ----------------------------------------------------------------------

type BookingItemProps = {
    item: IPropertyResultResponse;
    activeMarker?: number;
    selectedMarker: IMapMarker | null; // add this line
};

const ForSaleLabel = () => {
    const { t } = useTranslation();

    return (
        <Box
            borderRadius={1}
            sx={{
                position: "absolute",
                top: 4,
                left: 4,
                backgroundColor: "rgb(235, 0, 0)",
                color: "white",
                zIndex: 1,
                p: 0.5,
            }}
            textAlign={"center"}
        >
            <Typography fontSize={"14px"}>{t("For Sale")}</Typography>
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
                {value}
            </Label>
        </Box>
    );
};

const PriceLabel = ({ value }: { value: number }) => {
    if (!value) return null;
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

const defaultImage = "/static/noImage.png";

export const BookingItem = ({
    item,
    activeMarker,
    selectedMarker,
}: BookingItemProps) => {
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
    const itemRef = useRef<HTMLDivElement | null>(null);
    const isActive =
        item.location?.lat !== null &&
        item.location?.lat !== undefined &&
        item.location.lng !== null &&
        item.location.lng !== undefined &&
        selectedMarker?.lat !== null &&
        selectedMarker?.lat !== undefined &&
        selectedMarker?.lng !== null &&
        selectedMarker?.lng !== undefined &&
        item.location.lat === selectedMarker?.lat &&
        item.location.lng === selectedMarker?.lng;

    useMemo(() => {
        if (isActive && itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isActive]);

    const _carouselImages: ICarouselImage[] = useMemo(() => {
        if (images && images.length > 0) {
            return images.map((image, index) => ({
                id: `${index}`,
                title: "Image",
                image: image,
                description: "",
                path: "/repository",
            }));
        } else {
            return [
                {
                    id: "default",
                    title: "Default Image",
                    image: defaultImage,
                    description: "Default image description",
                    path: "/repository",
                },
            ];
        }
    }, [images]);

    return (
        <Paper
            ref={itemRef}
            sx={{
                position: "relative",

                mt: 2,
                mx: 1.5,
                pb: 2,
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
        >
            {state.key === "SALE" && <ForSaleLabel />}

            {_carouselImages.length > 0 && (
                <Box sx={{ position: "relative" }}>
                    <CarouselSimple
                        onImageClick={() => router.push(`property/${id}`)}
                        data={_carouselImages}
                        ratio="4/3"
                    />
                </Box>
            )}

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

            <TypeLabel value={parentCategory.value} />
            <PriceLabel value={price} />
        </Paper>
    );
};
