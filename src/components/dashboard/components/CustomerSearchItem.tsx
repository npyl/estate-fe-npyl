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
        [option.firstName]
    );
    const lastName = useMemo(
        () =>
            option.lastName
                ? parse(option.lastName, match(option.lastName, searchText))[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.lastName]
    );
    const email = useMemo(
        () =>
            option.email
                ? parse(option.email, match(option.email, searchText))[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.email]
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
        [option.mobilePhone]
    );
    const city = useMemo(
        () =>
            option.city
                ? parse(option.city, match(option.city, searchText))[0]
                : {
                      highlight: false,
                      text: "",
                  },
        [option.city]
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
                    <Stack alignItems={"center"} direction={"row"}>
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
                    {/* <Stack direction={"row"} alignItems={"center"} mr={1}>
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
								fontWeight: keyCode.highlight ? "bold" : "normal",
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
					</Stack> */}
                </Stack>
            </Stack>
        </StyledSearchStack>
    );
};
