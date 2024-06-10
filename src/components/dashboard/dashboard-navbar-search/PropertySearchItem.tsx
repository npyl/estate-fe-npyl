import { Box, Stack, Typography, Grid, useMediaQuery } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Image from "src/components/image/Image";
import { IPropertyResultResponse } from "src/types/properties";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";
import PreviewImage from "src/components/image/PreviewImage";
import { useRouter } from "next/router";
import { MatchResult } from "./types";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import useTheme from "@mui/system/useTheme";
import useHumanReadable from "@/components/Location/hook";
import {
    useGetMunicipalitiesQuery,
    useGetNeighbourhoodsQuery,
    useGetRegionsQuery,
} from "@/services/location";
import isNumberString from "@/components/Location/util";
import { NormalBadge } from "@/components/PropertyCard/styled";
import { t } from "i18next";

interface SearchItemProps {
    searchText: string;
    option: IPropertyResultResponse;
}

export const PropertySearchItem = ({ option, searchText }: SearchItemProps) => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    console.log(option);
    const {
        code: _code,
        keyCode: _keyCode,
        price: _price,
        area: _area,
        location: _location,
        ...rest
    } = option;

    const code = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.code, searchText]
    );
    const keyCode = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.keyCode, searchText]
    );
    const price = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.price, searchText]
    );
    const area = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.area, searchText]
    );

    const { data: regions } = useGetRegionsQuery();
    const { data: municips } = useGetMunicipalitiesQuery(
        +option?.location?.region!,
        {
            skip: !isNumberString(option?.location?.region),
        }
    );
    const { data: neighbs } = useGetNeighbourhoodsQuery(
        +option?.location?.city!,
        {
            skip: !isNumberString(option?.location?.city),
        }
    );

    const region = useHumanReadable(option.location?.region, regions);

    const city = useHumanReadable(option.location?.city, municips);
    const location = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.location, searchText]
    );

    const other: MatchResult = useMemo(() => {
        const result: MatchResult = {};

        for (const [key, value] of Object.entries(rest)) {
            if (!value) continue;

            const highlightResult = {
                highlight: false,
                value: value,
            };

            if (highlightResult.highlight) result[key] = value.toString();
        }

        return result;
    }, [rest, searchText]);

    return (
        <StyledSearchStack
            justifyContent={"flex-start"}
            paddingY={1}
            paddingX={1}
            spacing={0}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={() => router.push(`/property/${option.id}`)}
        >
            {option?.propertyImage ? (
                <Image
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={isMobile ? 170 : 300}
                    height={isMobile ? 170 : 175}
                    src={option.propertyImage}
                />
            ) : (
                <PreviewImage
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={isMobile ? 170 : 300}
                    height={isMobile ? 170 : 175}
                />
            )}

            <Stack direction={"column"} width="100%">
                <Grid container spacing={1} alignItems="center" marginLeft={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Name</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        sm={3}
                        sx={{
                            textAlign: { xs: "center", sm: "center" },
                        }}
                    >
                        <NormalBadge
                            name={t(option?.state?.value)}
                            color="indigo"
                        />
                    </Grid>
                </Grid>

                <Stack
                    direction={isMobile ? "column" : "row"}
                    marginLeft={2.7}
                    mt={1}
                    // alignItems="center"
                    width="100%"
                >
                    <Box
                        sx={{
                            width: isMobile ? "16px" : "18px",
                            height: isMobile ? "16px" : "18px",
                            mt: isMobile ? 1 : 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="100%"
                            height="100%"
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
                    </Box>
                    {isMobile ? (
                        <Typography
                            variant="body2"
                            ml={2.5}
                            mr={1.5}
                            mt={-2.5}
                            color="text.secondary"
                        >
                            {option?.location?.street}{" "}
                            {option?.location?.number}, {city}
                        </Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            ml={1}
                            mr={1.5}
                            color="text.secondary"
                        >
                            {region}, {option?.location?.street}{" "}
                            {option?.location?.number}, {city}
                        </Typography>
                    )}
                </Stack>

                <Grid
                    container
                    spacing={1}
                    marginLeft={2}
                    mt={1}
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            alignItems="center"
                        >
                            <Typography>
                                <i className="las la-bed" />
                            </Typography>
                            <Typography color="text.secondary">
                                {option?.details?.bedrooms === null
                                    ? "N/A beds"
                                    : `${option?.details?.bedrooms} beds`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            alignItems="center"
                        >
                            <Typography>
                                <i className="las la-bath" />
                            </Typography>
                            <Typography color="text.secondary">
                                {option?.details?.bathrooms === null
                                    ? "N/A baths"
                                    : `${option?.details?.bathrooms} baths`}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={1}
                    mt={1}
                    ml={3}
                >
                    <Typography>
                        <i className="las la-expand-arrows-alt " />
                    </Typography>
                    <Box
                        component="span"
                        color="text.secondary"
                        sx={{
                            typography: "body2",
                            fontWeight: area.highlight ? "bold" : "normal",
                        }}
                    >
                        {option?.area === null ? "N/A" : `${option?.area}`} m²
                    </Box>
                </Stack>

                <Grid container spacing={1} alignItems="center" mt={1} ml={2}>
                    <Grid item xs={6} sm={5}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "large",
                                }}
                            >
                                {option.price?.toLocaleString("de-DE")}
                            </Box>
                            <Typography fontWeight="bold">€</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={10} sm={4.5}>
                        <NormalBadge
                            name={`${t("Code")}: ${option.code || ""}`}
                            color="yellow"
                        />
                    </Grid>
                </Grid>

                {Object.entries(other).length > 0 && (
                    <Stack direction={"row"} alignItems={"center"} mt={1}>
                        {Object.entries(other).map(([key, value]) => (
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                mr={1}
                                key={key}
                            >
                                <Typography variant={"body2"}>
                                    {key}:{" "}
                                </Typography>
                                <Box
                                    component="span"
                                    sx={{
                                        typography: "body2",
                                        fontWeight: "bold",
                                        ml: 0.5,
                                    }}
                                >
                                    {value}
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                )}
            </Stack>
        </StyledSearchStack>
    );
};
