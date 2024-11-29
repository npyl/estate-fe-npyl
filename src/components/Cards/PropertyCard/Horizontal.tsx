import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useMemo, useRef } from "react";
import CarouselSimple from "@/components/CarouselSimple";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import { DividerSx, NormalBadge, PriceBadge, StyledLink } from "./styled";
import { getPropertyStatusColor } from "@/theme/colors";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
};

const defaultImage = "/static/noImage.png";

// -------------------------------------------------------------

const PropertyCard = ({ item }: PropertyCardProps) => {
    const {
        id,
        images,
        details,
        price,
        code,
        state,
        category,
        area,
        plotArea,
    } = item || {};

    const { bathrooms, bedrooms } = details || {};

    const { regionEN, regionGR, cityEN, cityGR, complexEN, complexGR } =
        (item as IPropertyResultResponse) || {};

    const { t, i18n } = useTranslation();

    const ref = useRef<HTMLAnchorElement>(null);

    const addressParts =
        i18n.language === "en"
            ? [regionEN, cityEN, complexEN]
            : [regionGR, cityGR, complexGR];

    const address = addressParts.filter((part) => part).join(", ");

    const convertedImages = useMemo(
        () =>
            images.map((url, index) => {
                let urlString = typeof url === "string" ? url : url?.url;
                urlString =
                    urlString && urlString.startsWith("https://")
                        ? urlString
                        : "https://" + urlString;
                return {
                    id: index,
                    url: urlString || defaultImage,
                    title: "",
                };
            }) || [],
        [images]
    );

    const stateColor = getPropertyStatusColor(state.value);

    return (
        <StyledLink isActive={false} ref={ref} href={`/property/${id}`}>
            <Grid container>
                <Grid item xs={4} p={1} borderRadius="12px">
                    <CarouselSimple
                        data={
                            convertedImages.length > 0
                                ? convertedImages
                                : [
                                      {
                                          id: 1,
                                          url: defaultImage,
                                          title: "",
                                      },
                                  ]
                        }
                        ratio="4/3"
                        isActive={item.active}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Stack
                        px={2}
                        py={2}
                        spacing={0.8}
                        justifyContent="space-between"
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <svg
                                width="14px"
                                height="14px"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <Typography variant="body2" color="text.secondary">
                                {address}
                            </Typography>
                        </Stack>

                        <Divider sx={DividerSx} />

                        <Stack
                            spacing={2.5}
                            direction="row"
                            mt={1}
                            flexWrap="wrap"
                        >
                            {/* ---- */}
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-bed" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {bedrooms || "-"}
                                    {t("beds")}
                                </Typography>
                            </Stack>
                            {/* ---- */}
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-bath" />
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {bathrooms || "-"}
                                    {t("baths")}
                                </Typography>
                            </Stack>
                            {/* ---- */}
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-expand-arrows-alt " />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {area || "-"}
                                    {"m²"}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-chart-area" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {plotArea || "-"}
                                    {"m²"}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={DividerSx} />

                        <Stack direction="row" spacing={1}>
                            {state?.value ? (
                                <NormalBadge
                                    name={t(state?.value)}
                                    color={stateColor}
                                />
                            ) : null}
                            {category?.value ? (
                                <NormalBadge
                                    name={t(category?.value)}
                                    color="#3730a3"
                                />
                            ) : null}
                        </Stack>
                        <SpaceBetween alignItems="center">
                            <NormalBadge
                                name={`${t("Code")}: ${code || ""}`}
                                color="#ffcc00"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.mode === "light"
                                            ? "#854D0E"
                                            : null,
                                }}
                            />

                            <PriceBadge price={price} />
                        </SpaceBetween>
                    </Stack>
                </Grid>
            </Grid>
        </StyledLink>
    );
};

export default PropertyCard;
