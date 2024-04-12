import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { IMapMarker } from "../Map/Map";
import { Divider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import CarouselSimple from "../CarouselSimple";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "../styled";
import {
    useGetMunicipalitiesQuery,
    useGetNeighbourhoodsQuery,
    useGetRegionsQuery,
} from "@/services/location";
import isNumberString from "../Location/util";
import useHumanReadable from "../Location/hook";
import { NormalBadge, PriceBadge, StyledBox } from "./styled";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
    selectedMarker: IMapMarker | null;
};

const defaultImage = "/static/noImage.png";

// -------------------------------------------------------------

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
        area,
    } = item || {};
    const { bathrooms, bedrooms } = details || {};
    const { lat, lng } = location || {};

    const { t } = useTranslation();
    const router = useRouter();
    const ref = useRef<HTMLDivElement>();

    const { data: regions } = useGetRegionsQuery();
    const { data: municips } = useGetMunicipalitiesQuery(+location?.region!, {
        skip: !isNumberString(location?.region),
    });
    const { data: neighbs } = useGetNeighbourhoodsQuery(+location?.city!, {
        skip: !isNumberString(location?.city),
    });

    // region is most of the types a code; translate to human readable form; otherwise just return the string
    const region = useHumanReadable(location?.region, regions);

    // city is most of the types a code; translate to human readable form; otherwise just return the string
    const city = useHumanReadable(location?.city, municips);

    // neighb is most of the types a code; translate to human readable form; otherwise just return the string
    const neighb = useHumanReadable(location?.complex, neighbs);

    const address = `${region} ${city} ${neighb}`;

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

    return (
        <StyledBox
            borderRadius="12px"
            sx={{
                cursor: "pointer",
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
            />

            <Stack px={2} py={2} spacing={0.8}>
                <Stack spacing={4} direction="row" mt={1}>
                    {/* ---- */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>
                            <i className="las la-bed" />
                        </Typography>
                        <Typography variant="body2">
                            {bedrooms || "-"} {t("beds")}
                        </Typography>
                    </Stack>
                    {/* ---- */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>
                            <i className="las la-bath" />
                        </Typography>
                        <Typography variant="body2">
                            {bathrooms || "-"} {t("baths")}
                        </Typography>
                    </Stack>
                    {/* ---- */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>
                            <i className="las la-expand-arrows-alt " />
                        </Typography>
                        <Typography variant="body2">
                            {area || "-"} m²
                        </Typography>
                    </Stack>
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

                <Stack direction="row" spacing={0.3}>
                    {state?.value ? (
                        <NormalBadge name={t(state?.value)} color="indigo" />
                    ) : null}
                    {category?.value ? (
                        <NormalBadge name={t(category?.value)} color="indigo" />
                    ) : null}
                </Stack>
                <SpaceBetween alignItems="center">
                    <NormalBadge
                        name={`${t("Code")}: ${code || ""}`}
                        color="yellow"
                    />

                    <PriceBadge price={price} />
                </SpaceBetween>
            </Stack>
        </StyledBox>
    );
};

export default PropertyCard;
