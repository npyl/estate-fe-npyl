"use client";

import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import {
    Box,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import CarouselSimple from "src/components/CarouselSimple";
import { IMapMarker } from "src/components/Map/Map";
import { IPropertyResultResponse } from "src/types/properties";
import { formatNumberWithCommas } from "src/utils/formatNumber";
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
                top: 5,
                left: 5,
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

            <Box sx={{ position: "relative" }}>
                <CarouselSimple
                    onImageClick={() => router.push(`property/${id}`)}
                    data={convertedImages}
                    ratio="4/3"
                />
            </Box>

            <Box
                sx={{
                    p: 2,
                    display: "grid",
                    gap: 0.5,
                    cursor: "pointer",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        gap: 1.5,
                    }}
                >
                    <RoomOutlinedIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body1">
                        {location?.street ?? ""} {location?.number ?? ""}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1, borderColor: "divider" }} />
                <Grid container spacing={2}>
                    <Grid item>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <BedOutlinedIcon />
                            <Typography variant="body2" color="text.secondary">
                                {details?.bedrooms || "N/A"} {t("beds")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <BathtubOutlinedIcon />
                            <Typography variant="body2" color="text.secondary">
                                {details?.bathrooms || "N/A"} {t("baths")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <AspectRatioIcon />
                            <Typography variant="body2" color="text.secondary">
                                {area || "N/A"} m²
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1, borderColor: "divider" }} />

                {(parentCategory.value || price) && (
                    <Stack
                        direction={"row"}
                        display={"flex"}
                        justifyContent={"space-between"}
                    >
                        {parentCategory.value && (
                            <Chip label={parentCategory.value} color="info" />
                        )}
                        {price && (
                            <Chip
                                label={`${formatNumberWithCommas(price)} €`}
                                color="success"
                            />
                        )}
                    </Stack>
                )}
            </Box>
        </Paper>
    );
};
