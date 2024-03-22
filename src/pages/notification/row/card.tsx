import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ListingNotification } from "src/types/notification/listing";
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
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                // position: "relative",
                // mt: 2,
                // mx: 1.5,
                // pb: 2,
                boxShadow: `rgba(0, 0, 0, 0.25) 0px 5px 15px`,
                // fontWeight: "normal",
                "&:hover": {
                    cursor: "pointer",
                    boxShadow: `rgba(0, 0, 0, 0.65) 0px 5px 15px`,
                },
                borderRadius: "15px",
                backgroundColor: "background.paper",
            }}
        >
            {item?.state?.key === "SALE" && <ForSaleLabel />}

            <Box sx={{ position: "relative", height: "100%" }}>
                <Image src={item?.photo || defaultImage} fill alt="" />
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

                <Stack
                    direction={"row"}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    {item?.parentCategory?.key ? (
                        <Chip label={item?.parentCategory.key} color="info" />
                    ) : null}
                    {item?.price ? (
                        <Chip
                            label={`${formatNumberWithCommas(item?.price)} €`}
                            color="success"
                        />
                    ) : null}
                </Stack>
            </Box>
        </Box>
    );
};
