import { Box, Grid, Stack, Typography } from "@mui/material";
// import match from "autosuggest-highlight/match";
// import parse from "autosuggest-highlight/parse";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ICustomerResultResponse } from "src/types/customer";

interface SearchItemProps {
    searchText: string;
    option: ICustomerResultResponse;
}

interface ItemProps {
    highlight: boolean;
    label?: string;
    value: string;
}

const Item = ({ highlight, label, value }: ItemProps) => {
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
                highlight: false,
                text: "",
            }),
        [option.firstName, searchText]
    );
    const lastName = useMemo(
        () =>
            // option.lastName ? parse(option.lastName, match(option.lastName, searchText))[0]
            ({
                highlight: false,
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

                <Stack gap={1} direction={"row"}>
                    <Stack flex={1}>
                        <Item
                            label="Email"
                            value={option.email}
                            highlight={email.highlight}
                        />
                        <Item
                            label="Mobile"
                            value={option.mobilePhone}
                            highlight={mobilePhone.highlight}
                        />
                    </Stack>
                    <Stack alignItems={"center"} direction={"row"}>
                        <Item
                            label="City"
                            value={option.city}
                            highlight={city.highlight}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </StyledSearchStack>
    );
};
