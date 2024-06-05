import { Box, Stack, Typography, Grid, useMediaQuery } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Image from "src/components/image/Image";
// import match from "autosuggest-highlight/match";
// import parse from "autosuggest-highlight/parse";
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

interface SearchItemProps {
    searchText: string;
    option: IPropertyResultResponse;
}

export const PropertySearchItem = ({ option, searchText }: SearchItemProps) => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
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
            paddingX={2}
            spacing={2}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={() => router.push(`/property/${option.id}`)}
        >
            {option?.propertyImage ? (
                <Image
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={isMobile ? 150 : 300}
                    height={isMobile ? 75 : 155}
                    src={option.propertyImage}
                />
            ) : (
                <PreviewImage
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={isMobile ? 150 : 300}
                    height={isMobile ? 75 : 155}
                />
            )}

            <Stack direction={"column"} width="100%">
                <Grid container spacing={1} alignItems="center" marginLeft={2}>
                    <Grid item xs={6} sm={6}>
                        <Typography variant="h6">Name</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={3}
                        sx={{ textAlign: { xs: "center", sm: "center" } }}
                    >
                        <Box
                            sx={{
                                border: "1px solid lightblue",
                                backgroundColor: "lightblue",
                                borderRadius: "15px",
                                p: 0.5,
                                px: 1,
                            }}
                        >
                            {option.state.value}
                        </Box>
                    </Grid>
                </Grid>

                <Stack
                    direction="row"
                    marginLeft={2}
                    mt={1}
                    alignItems="center"
                >
                    <LocationOnOutlinedIcon />
                    <Typography variant="body2" ml={1}>
                        {option.location.region}, {option.location.street}{" "}
                        {option.location.number}, {option.location.city}
                    </Typography>
                </Stack>

                <Grid
                    container
                    spacing={1}
                    marginLeft={2}
                    mt={1}
                    alignItems="center"
                >
                    <Grid item xs={6} sm={6}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            alignItems="center"
                        >
                            <BedOutlinedIcon />
                            <Typography>
                                {option.details.bedrooms === null
                                    ? "N/A beds"
                                    : option.details.bedrooms}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            alignItems="center"
                        >
                            <BathtubOutlinedIcon />
                            <Typography>
                                {option.details.bathrooms === null
                                    ? "N/A baths"
                                    : option.details.bathrooms}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                    ml={3}
                >
                    <Box
                        component="span"
                        sx={{
                            typography: "body2",
                            fontWeight: area.highlight ? "bold" : "normal",
                        }}
                    >
                        {option.area} m²
                    </Box>
                </Stack>

                <Grid container spacing={1} alignItems="center" mt={1} ml={2}>
                    <Grid item xs={6} sm={6}>
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
                                {option.price}
                            </Box>
                            <Typography fontWeight="bold">€</Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={3.5}
                        md={4.5}
                        lg={3.5}
                        sx={{
                            textAlign: { xs: "center", sm: "center" },
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                border: "1px solid #ffc93c",
                                borderRadius: "15px",
                                backgroundColor: "#ffc93c",
                                p: 0.5,
                                alignItems: "center",
                            }}
                        >
                            <Typography variant={"body2"} ml={0.5}>
                                Code:{" "}
                            </Typography>
                            <Box
                                component="span"
                                sx={{
                                    typography: "body2",
                                    fontWeight: code.highlight
                                        ? "bold"
                                        : "normal",
                                    ml: 1,
                                }}
                            >
                                {option.code}
                            </Box>
                        </Stack>
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
