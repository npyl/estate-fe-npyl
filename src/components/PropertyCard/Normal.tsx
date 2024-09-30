import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { IMapMarker } from "../Map/Map";
import { Divider, Stack, Typography, alpha } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import CarouselSimple from "../CarouselSimple";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "../styled";
import { NormalBadge, PriceBadge, StyledBox } from "./styled";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
    selectedMarker: IMapMarker | null;
};

const defaultImage = "/static/noImage.png";

type PropertyStatus =
    | "SOLD"
    | "SALE"
    | "RENTED"
    | "UNAVAILABLE"
    | "RENT"
    | "TAKEN"
    | "UNDER_CONSTRUCTION"
    | "UNDER_MAINTENANCE";

const STATUS_COLORS: Record<PropertyStatus, Color> = {
    SOLD: "#79798a",
    SALE: "#57825e",
    RENT: "#bd9e39",
    RENTED: "#3e78c2",
    UNAVAILABLE: "#c72c2e",
    TAKEN: "#7d673e",
    UNDER_CONSTRUCTION: "#A300D8",
    UNDER_MAINTENANCE: "#E0067C",
};
type Color = string;

const getStatusColor = (status: string): Color => {
    const statusUpper = status.toUpperCase() as PropertyStatus;

    return STATUS_COLORS[statusUpper] || "#537f91"; // default color if status is not recognized
};

const PropertyCard = ({ item, selectedMarker }: PropertyCardProps) => {
    const {
        id,
        images,
        details,
        location,
        price,
        code,
        state,
        category,
        parentCategory,
        area,
        plotArea,
    } = item || {};

    const { regionEN, regionGR, cityEN, cityGR, complexEN, complexGR } =
        (item as IPropertyResultResponse) || {};

    const bathrooms = details?.bathrooms;
    const bedrooms = details?.bedrooms;

    const { lat, lng } = location || {};

    const { t, i18n } = useTranslation();
    const router = useRouter();
    const ref = useRef<HTMLDivElement>();

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

    const isActive = useMemo(
        () =>
            lat &&
            lat > 0 &&
            lng &&
            lng > 0 &&
            lat === selectedMarker?.lat &&
            lng === selectedMarker?.lng,
        [lat, lng, selectedMarker]
    );
    useEffect(() => {
        if (isActive) {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isActive]);

    const handleClick = useCallback(() => router.push(`property/${id}`), []);

    const stateColor = state?.value ? getStatusColor(state.value) : "#537f91"; // default color

    return (
        <StyledBox
            borderRadius="12px"
            sx={{
                cursor: "pointer",
                mr: 0.8,
            }}
            isActive={isActive as boolean}
            ref={ref}
            onClick={handleClick}
        >
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

            <Stack px={2} py={2} spacing={0.8}>
                <Stack spacing={1} direction="row" mt={1} flexWrap="wrap">
                    {parentCategory.key !== "LAND" ? (
                        <Stack
                            spacing={2}
                            direction="row"
                            mt={1}
                            flexWrap="nowrap"
                        >
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-chart-area" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {plotArea || "N/A"}
                                    {plotArea ? " m²" : null}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-expand-arrows-alt" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {area || "N/A"}
                                    {area ? " m²" : null}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.8}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-bed" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {bedrooms || item.bedrooms || "N/A"}{" "}
                                    {/* {t("beds")} */}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.8}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-bath" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {bathrooms || item.bathrooms || "N/A"}{" "}
                                    {/* {t("baths")} */}
                                </Typography>
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack
                            spacing={2}
                            direction="row"
                            mt={1}
                            flexWrap="nowrap"
                        >
                            <Stack
                                direction="row"
                                spacing={0.5}
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
                                    {" m²"}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="la-divide " />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {details?.setbackCoefficient || "-"}
                                    {""}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-expand-arrows-alt" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {details?.frontage || item?.plotArea || "-"}
                                    {" m²"}
                                </Typography>
                            </Stack>
                        </Stack>
                    )}
                </Stack>

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

                <Divider />

                <Stack
                    direction="row"
                    alignItems={"center"}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                >
                    {state?.value ? (
                        <NormalBadge name={t(state.value)} color={stateColor} />
                    ) : null}
                    {category?.value ? (
                        <NormalBadge
                            name={t(category.value)}
                            color={"#3730a3"}
                        />
                    ) : null}
                </Stack>
                <SpaceBetween alignItems="center">
                    <NormalBadge
                        name={`${t("Code")}: ${code || ""}`}
                        color={"#ffcc00"}
                        sx={{ color: "#854D0E" }}
                    />

                    <PriceBadge price={price} />
                </SpaceBetween>
            </Stack>
        </StyledBox>
    );
};

export default PropertyCard;
