import { Box, Grid, Stack, Typography } from "@mui/material";
// import match from "autosuggest-highlight/match";
// import parse from "autosuggest-highlight/parse";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ICustomerResultResponse } from "src/types/customer";
import { SxProps, fontWeight } from "@mui/system";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
interface SearchItemProps {
    searchText: string;
    option: ICustomerResultResponse;
}

interface ItemProps {
    highlight: boolean;
    label?: string;
    value: string;
    sx?: SxProps;
}

const Item = ({ highlight, label, value, sx }: ItemProps) => {
    return (
        <Stack direction={"row"} gap={1}>
            {label && <Typography variant="body2">{`${label}: `} </Typography>}
            <Box
                component="span"
                sx={{
                    typography: "body2",
                    fontWeight: highlight ? "bold" : "normal",
                }}
            >
                {value}
            </Box>
        </Stack>
    );
};

export const CustomerSearchItem = ({ option, searchText }: SearchItemProps) => {
    const router = useRouter();
    const firstName = useMemo(
        () =>
            // option.firstName ? match(option.firstName, searchText) //       option.firstName, //  ? parse( // TODO: highlight
            ({
                highlight: true,
                text: "",
            }),
        [option.firstName, searchText]
    );
    const lastName = useMemo(
        () =>
            // option.lastName ? parse(option.lastName, match(option.lastName, searchText))[0]
            ({
                highlight: true,
                text: "",
            }),
        [option.lastName, searchText]
    );
    const email = useMemo(
        () =>
            // option.email
            //  ? parse(option.email, match(option.email, searchText))[0]
            ({
                highlight: false,
                text: "",
            }),
        [option.email, searchText]
    );
    const mobilePhone = useMemo(
        () =>
            // option.mobilePhone
            //     ? parse(
            //           option.mobilePhone,
            //           match(option.mobilePhone, searchText)
            //       )[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.mobilePhone, searchText]
    );
    const city = useMemo(
        () =>
            // option.city
            //     ? parse(option.city, match(option.city, searchText))[0]
            //     :
            ({
                highlight: false,
                text: "",
            }),
        [option.city, searchText]
    );

    const area = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.area, searchText]
    );

    return (
        <StyledSearchStack
            justifyContent={"flex-start"}
            paddingY={1}
            paddingX={2}
            gap={2}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={() => router.push(`/customer/${option.id}`)}
        >
            <Stack direction={"column"} flex={1} gap={2}>
                <Stack direction={"row"} flex={1} gap={1}>
                    <Item
                        value={option.firstName}
                        highlight={firstName.highlight}
                    />
                    <Item
                        value={option.lastName}
                        highlight={lastName.highlight}
                    />
                </Stack>
                <Stack alignItems={"center"} direction={"row"} gap={1}>
                    <LocationOnOutlinedIcon />
                    <Item value={option.city} highlight={city.highlight} />
                    {/* <Item value={+option?.area!} highlight={area.highlight} /> */}
                </Stack>
                <Stack gap={2} direction={"column"}>
                    <Stack flex={1} direction="row" gap={1}>
                        <EmailOutlinedIcon />
                        <Item
                            value={option.email}
                            highlight={email.highlight}
                            sx={{ fontWeight: "bold" }}
                        />
                    </Stack>
                    <Stack flex={1} direction="row" gap={1}>
                        <PhoneOutlinedIcon />
                        <Item
                            value={option.mobilePhone}
                            highlight={mobilePhone.highlight}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </StyledSearchStack>
    );
};
