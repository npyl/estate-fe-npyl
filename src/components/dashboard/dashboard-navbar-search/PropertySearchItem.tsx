import {
    Box,
    Stack,
    Typography,
    Grid,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Image from "src/components/image/Image";
import { IPropertyResultResponse } from "src/types/properties";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";
import PreviewImage from "src/components/image/PreviewImage";
import { useRouter } from "next/router";
import { MatchResult } from "./types";
import { useTranslation } from "react-i18next";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";
import { getPropertyStatusColor } from "@/theme/colors";

interface SearchItemProps {
    searchText: string;
    option: IPropertyResultResponse;
    onClick: (value: string) => void;
}

export const PropertySearchItem = ({
    option,
    searchText,
    onClick,
}: SearchItemProps) => {
    const { i18n, t } = useTranslation();

    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        code: _code,
        keyCode: _keyCode,
        price: _price,
        area: _area,
        location: _location,
        // ...
        regionEN,
        regionGR,
        cityEN,
        cityGR,
        // ...
        state: _state,
        ...rest
    } = option;

    const region = i18n.language === "en" ? regionEN : regionGR;
    const city = i18n.language === "en" ? cityEN : cityGR;

    const addressParts = [
        region,
        option?.location?.street
            ? `${option?.location?.street} ${option?.location?.number || ""}`
            : "",
        city,
    ];

    const address = addressParts.filter((part) => part).join(", ");

    const stateColor = getPropertyStatusColor(_state.value);

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

    const handleClick = () => {
        onClick(`${option.code}`);
        router.push(`/property/${option.id}`);
    };

    return (
        <StyledSearchStack
            justifyContent={"flex-start"}
            paddingY={1}
            paddingX={1}
            spacing={0}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={handleClick}
            sx={{
                overflowX: "hidden",
                overflowY: "hidden",
                minHeight: isMobile ? "400px" : "195px",
            }}
        >
            {" "}
            <Box
                sx={{
                    width: isMobile ? 420 : 420,
                    height: isMobile ? 220 : 175,
                    borderColor: "1px solid red",
                    borderRadius: 1,
                    overflow: "hidden",
                }}
            >
                {option?.propertyImage ? (
                    <Image
                        padding={0}
                        sx={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                        src={option.propertyImage}
                    />
                ) : (
                    <PreviewImage padding={0} sx={{ borderRadius: 1 }} />
                )}
            </Box>
            <Stack direction={"column"} width="100%">
                <Grid
                    container
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                    marginLeft={1}
                >
                    <Grid item xs={12} sm={6} mr={isMobile ? 1 : 0}>
                        {option?.title ? (
                            <Typography fontWeight="bold" fontSize="0.9375rem">
                                {option?.title}
                            </Typography>
                        ) : null}
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        sm={4.3}
                        sx={{
                            ml: 1.3,
                            textAlign: { xs: "center", sm: "center" },
                        }}
                    >
                        <NormalBadge
                            name={t(option?.state?.value)}
                            color={stateColor}
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
                            {address}{" "}
                        </Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            ml={1}
                            mr={1.5}
                            color="text.secondary"
                            sx={{ textWrap: "wrap" }}
                        >
                            {address}{" "}
                        </Typography>
                    )}
                </Stack>

                <Grid
                    container
                    spacing={1}
                    marginLeft={2}
                    mt={0}
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
                            <Typography color="text.secondary" variant="body2">
                                {option?.details?.bedrooms === null
                                    ? `N/A ${t("beds")}`
                                    : `${option?.details?.bedrooms} ${t(
                                          "beds"
                                      )}`}
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
                            <Typography color="text.secondary" variant="body2">
                                {option?.details?.bathrooms === null
                                    ? `N/A ${t("baths")}`
                                    : `${option?.details?.bathrooms} ${t(
                                          "baths"
                                      )}`}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={1}
                    marginLeft={2}
                    mt={0}
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
                                <i className="las la-chart-area" />
                            </Typography>

                            <Typography
                                component="span"
                                color="text.secondary"
                                sx={{
                                    typography: "body2",
                                    fontWeight: area.highlight
                                        ? "bold"
                                        : "normal",
                                }}
                            >
                                {option?.plotArea === null
                                    ? "N/A"
                                    : `${option?.plotArea}`}{" "}
                                m²
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
                                <i className="las la-expand-arrows-alt " />
                            </Typography>
                            <Typography
                                component="span"
                                color="text.secondary"
                                sx={{
                                    typography: "body2",
                                    fontWeight: area.highlight
                                        ? "bold"
                                        : "normal",
                                }}
                            >
                                {option?.area === null
                                    ? "N/A"
                                    : `${option?.area}`}{" "}
                                m²
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center" mt={1} ml={2}>
                    <Grid item xs={6} sm={5.7}>
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

                    <Grid item xs={10} sm={5}>
                        <NormalBadge
                            name={`${t("Code")}: ${option.code || ""}`}
                            color={"#ffcc00"}
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "#854D0E"
                                        : null, // Fallback to grey if neutral is undefined
                            }}
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
