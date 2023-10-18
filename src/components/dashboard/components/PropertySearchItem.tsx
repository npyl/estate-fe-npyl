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

        ...rest
    } = option;

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
            spacing={1}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={() => router.push(`/property/${option.id}`)}
        >
            {option?.propertyImage ? (
                <Image
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={160}
                    height={90}
                    src={option.propertyImage}
                />
            ) : (
                <PreviewImage
                    padding={0}
                    sx={{ borderRadius: 1 }}
                    width={160}
                    height={90}
                />
            )}

            <Stack direction={"column"}>
                <Stack spacing={1} direction={"row"}>
                    <Stack alignItems={"center"} direction={"row"}>
                        <Typography variant={"body2"}>Code: </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: code.highlight ? "bold" : "normal",
                            }}
                        >
                            {option.code}
                        </Box>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} mr={1}>
                        <Box>
                            <KeyIcon
                                sx={{
                                    marginTop: "5px",
                                    fontSize: "16px",
                                    transform: "rotate(90deg)",
                                }}
                            />
                        </Box>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: keyCode.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.keyCode}
                        </Box>
                    </Stack>
                </Stack>
                <Stack alignItems={"center"} direction={"row"}>
                    <Stack direction={"row"} alignItems={"center"} mr={1}>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: price.highlight ? "bold" : "normal",
                            }}
                        >
                            {option.price}
                        </Box>
                        <Typography variant={"body2"}>€</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: area.highlight ? "bold" : "normal",
                            }}
                        >
                            {option.area}
                        </Box>
                        <Typography variant={"body2"}> s.q</Typography>
                    </Stack>
                </Stack>

                <Stack alignItems={"center"} direction={"row"}>
                    {Object.entries(other).map(([key, value]) => (
                        <Stack direction={"row"} alignItems={"center"} mr={1}>
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
