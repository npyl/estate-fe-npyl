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
import Image from "next/image";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ListingNotification } from "src/types/notification";
import { formatNumberWithCommas } from "src/utils/formatNumber";

type BookingItemProps = {
    item?: ListingNotification;
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

export const ListingCard = ({ item }: BookingItemProps) => {
    const itemRef = useRef<HTMLDivElement | null>(null);

    return (
        <Paper
            ref={itemRef}
            sx={{
                width: "500px",
                height: "300px",
                position: "relative",
                mt: 2,
                mx: 1.5,
                pb: 2,
                border: 0,
                borderRadius: 1,
                boxShadow: `rgba(0, 0, 0, 0.25) 0px 5px 15px`,
                fontWeight: "normal",
                "&:hover": {
                    cursor: "pointer",
                    boxShadow: `rgba(0, 0, 0, 0.65) 0px 5px 15px`,
                },
            }}
        >
            {item?.state === "SALE" && <ForSaleLabel />}

            <Box sx={{ position: "relative" }}>
                <Image
                    alt=""
                    src={item?.photo || defaultImage}
                    width={0}
                    height={0}
                    fill
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
                        {item?.location?.street ?? ""}{" "}
                        {item?.location?.number ?? ""}
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
                                {item?.bedrooms || "N/A"} {t("beds")}
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
                                {item?.bathrooms || "N/A"} {t("baths")}
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
                                {item?.area || "N/A"} m²
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1, borderColor: "divider" }} />

                {(item?.parentCategory || item?.price) && (
                    <Stack
                        direction={"row"}
                        display={"flex"}
                        justifyContent={"space-between"}
                    >
                        {item?.parentCategory && (
                            <Chip label={item?.parentCategory} color="info" />
                        )}
                        {item?.price && (
                            <Chip
                                label={`${formatNumberWithCommas(
                                    item?.price
                                )} €`}
                                color="success"
                            />
                        )}
                    </Stack>
                )}
            </Box>
        </Paper>
    );
};
