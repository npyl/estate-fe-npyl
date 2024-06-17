import { Box, Stack, Typography } from "@mui/material";
// import match from "autosuggest-highlight/match";
// import parse from "autosuggest-highlight/parse";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ICustomerResultResponse } from "src/types/customer";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { NormalBadge } from "@/components/PropertyCard/styled";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

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
        () => ({
            highlight: true,
            text: "",
        }),
        [option.firstName, searchText]
    );
    const lastName = useMemo(
        () => ({
            highlight: true,
            text: "",
        }),
        [option.lastName, searchText]
    );
    const email = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.email, searchText]
    );
    const mobilePhone = useMemo(
        () => ({
            highlight: false,
            text: "",
        }),
        [option.mobilePhone, searchText]
    );
    const city = useMemo(
        () => ({
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
                    {option?.seller === true ? (
                        <NormalBadge name={"Seller"} color="indigo" />
                    ) : null}
                    {option?.buyer === true ? (
                        <NormalBadge name={"Buyer"} color="indigo" />
                    ) : null}
                    {option?.lessor === true ? (
                        <NormalBadge name={"Lessor"} color="indigo" />
                    ) : null}
                    {option?.leaser === true ? (
                        <NormalBadge name={"Leaser"} color="indigo" />
                    ) : null}
                </Stack>
                <Stack
                    alignItems={"center"}
                    direction={"row"}
                    // justifyContent="space-between"
                    gap={1}
                    sx={{
                        color: "text.secondary",
                        alignItems: "center",
                    }}
                >
                    <LocationOnOutlinedIcon
                        sx={{
                            color: "black",
                            width: "18px",
                            height: "18px",
                        }}
                    />
                    <Stack
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Item value={option.city} highlight={city.highlight} />
                        {/* <Item value={+option?.area!} highlight={area.highlight} /> */}
                    </Stack>
                </Stack>
                <Stack gap={2} direction={"column"}>
                    <Stack
                        flex={1}
                        direction="row"
                        gap={1}
                        sx={{
                            color: "text.secondary",
                            alignItems: "center",
                        }}
                    >
                        <EmailOutlinedIcon
                            sx={{
                                color: "black",
                                width: "18px",
                                height: "18px",
                            }}
                        />
                        <Stack
                            width="100%"
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Item
                                value={option.email}
                                highlight={email.highlight}
                            />{" "}
                            {option?.labels.length !== 0 ? (
                                <Stack
                                    direction="row"
                                    gap={1}
                                    alignItems={"center"}
                                >
                                    <SellOutlinedIcon
                                        sx={{
                                            color: "black",
                                            width: "18px",
                                            height: "18px",
                                        }}
                                    />
                                    <Typography>
                                        {" "}
                                        {option?.labels
                                            ?.map((n) => n.name)
                                            .join(", ")}
                                    </Typography>
                                </Stack>
                            ) : null}
                        </Stack>
                    </Stack>
                    <Stack
                        flex={1}
                        direction="row"
                        gap={1}
                        sx={{
                            color: "text.secondary",
                            alignItems: "center",
                        }}
                    >
                        <PhoneOutlinedIcon
                            sx={{
                                color: "black",
                                width: "18px",
                                height: "18px",
                            }}
                        />
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
