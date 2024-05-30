import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IGeoLocation } from "src/types/geolocation";
import { StyledSearchStack } from "../styles";
import { useSearchLocationsQuery } from "src/services/location";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { MatchResult } from "./types";

interface SearchItemProps {
    searchText: string;
    option: IGeoLocation;
}

export const LocationSearchItem = ({ option, searchText }: SearchItemProps) => {
    const router = useRouter();

    const {
        areaID: _areaID,
        level: _level,
        nameEN: _nameEN,
        nameGR: _nameGR,
        parentID: _parentID,
        parentNameEN: _parentNameEN,
        parentNameGR: _parentNameGR,
        latitude: _latitude,
        longitude: _longitude,
        ...rest
    } = option;

    const nameEN = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.nameEN, searchText]
    );
    const nameGR = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.nameGR, searchText]
    );
    const parentNameEN = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.parentNameEN, searchText]
    );
    const parentNameGR = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.parentNameGR, searchText]
    );
    const latitude = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.latitude, searchText]
    );
    const longitude = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.longitude, searchText]
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
            spacing={1}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            // onClick={() => router.push(`/location/${option.areaID}`)}
        >
            <LocationOnIcon fontSize="large" />

            <Stack direction={"column"}>
                <Stack spacing={1} direction={"row"}>
                    <Stack alignItems={"center"} direction={"row"}>
                        <Typography variant={"body2"}>Name (EN): </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: nameEN.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.nameEN}
                        </Box>
                    </Stack>
                    <Stack alignItems={"center"} direction={"row"}>
                        <Typography variant={"body2"}>Name (GR): </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: nameGR.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.nameGR}
                        </Box>
                    </Stack>
                </Stack>
                <Stack alignItems={"center"} direction={"row"}>
                    <Stack direction={"row"} alignItems={"center"} mr={1}>
                        <Typography variant={"body2"}>Latitude: </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: latitude.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.latitude}
                        </Box>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Typography variant={"body2"}>Longitude: </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: longitude.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.longitude}
                        </Box>
                    </Stack>
                </Stack>
                <Stack alignItems={"center"} direction={"row"}>
                    <Stack alignItems={"center"} direction={"row"} mr={1}>
                        <Typography variant={"body2"}>
                            Parent Name (EN):{" "}
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: parentNameEN.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.parentNameEN}
                        </Box>
                    </Stack>
                    <Stack alignItems={"center"} direction={"row"}>
                        <Typography variant={"body2"}>
                            Parent Name (GR):{" "}
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: parentNameGR.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.parentNameGR}
                        </Box>
                    </Stack>
                </Stack>
                <Stack alignItems={"center"} direction={"row"}>
                    {Object.entries(other).map(([key, value]) => (
                        <Stack
                            key={key}
                            direction={"row"}
                            alignItems={"center"}
                            mr={1}
                        >
                            <Typography variant={"body2"}>{key}: </Typography>
                            <Box
                                component="span"
                                sx={{
                                    typography: "body2",
                                    fontWeight: "bold",
                                }}
                            >
                                {value}
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </StyledSearchStack>
    );
};

const LocationSearchResults = () => {
    const { data, isLoading } = useSearchLocationsQuery("Patra"); // Example level

    // if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {data?.map((location) => (
                <LocationSearchItem
                    key={location.areaID}
                    option={location}
                    searchText=""
                />
            ))}
        </div>
    );
};

export default LocationSearchResults;
