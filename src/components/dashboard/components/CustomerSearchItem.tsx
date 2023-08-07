import { Box, Stack, Typography } from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ICustomerResultResponse } from "src/types/customer";

interface SearchItemProps {
    searchText: string;
    option: ICustomerResultResponse;
}

export const CustomerSearchItem = ({ option, searchText }: SearchItemProps) => {
    const router = useRouter();

    const firstName = useMemo(
        () =>
            option.firstName
                ? parse(
                      option.firstName,
                      match(option.firstName, searchText)
                  )[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.firstName, searchText]
    );
    const lastName = useMemo(
        () =>
            option.lastName
                ? parse(option.lastName, match(option.lastName, searchText))[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.lastName, searchText]
    );
    const email = useMemo(
        () =>
            option.email
                ? parse(option.email, match(option.email, searchText))[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.email, searchText]
    );
    const mobilePhone = useMemo(
        () =>
            option.mobilePhone
                ? parse(
                      option.mobilePhone,
                      match(option.mobilePhone, searchText)
                  )[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.mobilePhone, searchText]
    );
    const city = useMemo(
        () =>
            option.city
                ? parse(option.city, match(option.city, searchText))[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.city, searchText]
    );

    return (
        <StyledSearchStack
            justifyContent={"flex-start"}
            paddingY={1}
            paddingX={2}
            spacing={1}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={() => router.push(`/customer/${option.id}`)}
        >
            <Stack direction={"column"}>
                <Stack spacing={1} direction={"row"}>
                    <Stack direction={"row"}>
                        <Typography variant={"body2"}>Firstname: </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: firstName.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.firstName}
                        </Box>
                    </Stack>
                    <Stack alignItems={"center"} direction={"row"}>
                        <Typography variant={"body2"}>Lastname: </Typography>
                        <Box
                            component="span"
                            sx={{
                                typography: "body2",
                                fontWeight: lastName.highlight
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {option.lastName}
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </StyledSearchStack>
    );
};
