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
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
import { TypeLabels } from "@/components/TypeLabels";

interface SearchItemProps {
    searchText: string;
    option: ICustomerResultResponse;
    onClick: (value: string) => void;
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

export const CustomerSearchItem = ({
    option,
    searchText,
    onClick,
}: SearchItemProps) => {
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

    const handleClick = () => {
        onClick(`${option.firstName} ${option.lastName}`);
        router.push(`/customer/${option.id}`);
    };

    return (
        <StyledSearchStack
            justifyContent={"flex-start"}
            paddingY={1}
            paddingX={2}
            gap={2}
            flex={1}
            direction={"row"}
            alignItems={"center"}
            onClick={handleClick}
            sx={{ height: "195px", width: "auto", overflowX: "hidden" }}
        >
            <Stack direction={"column"} flex={1} gap={2}>
                <Stack direction={"row"} flex={1} gap={1} alignItems="center">
                    <Item
                        value={option.firstName}
                        highlight={firstName.highlight}
                    />

                    <Item
                        value={option.lastName}
                        highlight={lastName.highlight}
                    />

                    <TypeLabels
                        seller={option.seller}
                        lessor={option.lessor}
                        leaser={option.leaser}
                        buyer={option.buyer}
                    />
                </Stack>
                <Stack
                    alignItems={"center"}
                    direction={"row"}
                    gap={1}
                    sx={{
                        color: "text.secondary",
                        alignItems: "center",
                    }}
                >
                    <LocationOnOutlinedIcon
                        sx={{
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
                        {option?.ownedProperties.length > 0 ? (
                            <Stack
                                direction="row"
                                gap={1}
                                alignItems={"center"}
                            >
                                <HomeOutlinedIcon
                                    sx={{
                                        width: "18px",
                                        height: "18px",
                                    }}
                                />
                                <Stack direction="row" gap={1}>
                                    {option?.ownedProperties.map((p) => (
                                        <Link
                                            key={p.id}
                                            href={`/property/${p.id}`}
                                            passHref
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Typography
                                                component="a"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                sx={{
                                                    textDecoration: "none",
                                                    color: "text.secondary",
                                                    "&:hover": {
                                                        color: (theme) =>
                                                            theme.palette
                                                                .mode ===
                                                            "light"
                                                                ? theme.palette
                                                                      .neutral?.[700] ||
                                                                  theme.palette
                                                                      .grey[700] // Fallback to grey if neutral is undefined
                                                                : "white",
                                                    },
                                                }}
                                            >
                                                {p.code}
                                            </Typography>
                                        </Link>
                                    ))}
                                </Stack>
                            </Stack>
                        ) : null}
                    </Stack>
                </Stack>
                <Stack gap={2} direction={"column"}>
                    <Stack
                        flex={1}
                        direction="row"
                        gap={1}
                        width="100%"
                        sx={{
                            color: "text.secondary",
                            alignItems: "center",
                        }}
                    >
                        <EmailOutlinedIcon
                            sx={{
                                // color: "black",
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
                                            // color: "black",
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
                                // color: "black",
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
