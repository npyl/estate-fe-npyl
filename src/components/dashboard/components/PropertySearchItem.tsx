import { Box, Stack, Typography } from "@mui/material";
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
interface SearchItemProps {
    searchText: string;
    option: IPropertyResultResponse;
}

export const PropertySearchItem = ({ option, searchText }: SearchItemProps) => {
    const router = useRouter();

    const {
        code: _code,
        keyCode: _keyCode,
        price: _price,
        area: _area,
        location: _location,
        ...rest
    } = option;
    console.log(option);
    const code = useMemo(
        () =>
            // option.code
            //     ? parse(option.code, match(option.code, searchText))[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.code, searchText]
    );
    const keyCode = useMemo(
        () =>
            // option.keyCode
            //     ? parse(option.keyCode, match(option.keyCode, searchText))[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.keyCode, searchText]
    );
    const price = useMemo(
        () =>
            // option.price
            //     ? parse(
            //           option.price.toString(),
            //           match(option.price.toString(), searchText)
            //       )[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.price, searchText]
    );
    const area = useMemo(
        () =>
            // option.area
            //     ? parse(
            //           option.area.toString(),
            //           match(option.area.toString(), searchText)
            //       )[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.area, searchText]
    );

    const location = useMemo(
        () =>
            // option.area
            //     ? parse(
            //           option.area.toString(),
            //           match(option.area.toString(), searchText)
            //       )[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.location, searchText]
    );

    // other matchings
    const other: MatchResult = useMemo(() => {
        const result: MatchResult = {};

        for (const [key, value] of Object.entries(rest)) {
            if (!value) continue;

            // const highlightResult = parse(
            //     value.toString(),
            //     match(value.toString(), searchText)
            // )[0];
            const highlightResult = {
                highlight: false,
                value: value,
            };

            // add only if highlighted
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
                    width={300}
                    height={155}
                    src={option.propertyImage}
                />
            ) : (
                <PreviewImage
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={300}
                    height={155}
                />
            )}

            <Stack direction={"column"} width="100%">
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems="center"
                    width="100%"
                    marginLeft={2}
                >
                    <Typography variant="h6">Name</Typography>
                    <Box
                        sx={{
                            border: "1px solid lightblue",
                            backgroundColor: "lightblue",
                            borderRadius: "15px",
                            p: 0.5,
                            px: 2,
                            mr: 10,
                        }}
                    >
                        {option.state.value}
                    </Box>
                </Stack>
                <Stack direction="row" marginLeft={2} mt={1}>
                    <LocationOnOutlinedIcon />
                    <Typography variant="body2">
                        {option.location.region}, {option.location.street}{" "}
                        {option.location.number}, {option.location.city}
                    </Typography>
                </Stack>

                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    width="100%"
                    mt={1}
                    marginLeft={2}
                >
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

                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={1}
                        alignItems="center"
                        mr={10}
                    >
                        <BathtubOutlinedIcon />
                        <Typography>
                            {option.details.bathrooms === null
                                ? "N/A baths"
                                : option.details.bathrooms}
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                    ml={2}
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

                <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                            ml: 2,
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
                    <Stack
                        direction="row"
                        sx={{
                            border: "1px solid #ffc93c",
                            borderRadius: "15px",
                            backgroundColor: "#ffc93c",
                            p: 0.5,
                            px: 2,
                            mr: 8,
                        }}
                    >
                        <Typography variant={"body2"}>Code: </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: code.highlight ? "bold" : "normal",
                                ml: 1,
                            }}
                        >
                            {option.code}
                        </Box>
                    </Stack>
                </Stack>

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
