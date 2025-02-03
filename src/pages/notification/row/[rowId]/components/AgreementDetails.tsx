import React from "react";
import { Stack, Typography, Tooltip } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ExpireIcon from "@mui/icons-material/AccessTime";
import ExpiredIcon from "@mui/icons-material/Error";
// Adjust the path as necessary
import Link from "@/components/Link";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";
import { ContactNotificationExtended } from "@/types/notification";

interface AgreementDetailsProps {
    data: ContactNotificationExtended;
}

const AgreementDetails: React.FC<AgreementDetailsProps> = ({ data }) => {
    const { t } = useTranslation();

    const expirationDate = data?.agreement?.expirationDate
        ? format(new Date(data?.agreement?.expirationDate), "dd MMMM yyyy")
        : "";

    const propertyHref = `/property/${data?.agreement?.property?.id}`;
    const customerHref = `/customer/${data?.agreement?.owner?.id}`;

    return (
        <>
            <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
                mt={1}
            >
                <Typography variant="h6">{data?.agreement?.title}</Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="right"
                >
                    {format(
                        new Date(data?.notificationDate || ""),
                        "dd MMM yyyy"
                    )}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="body2" mt={0.5}>
                    {data?.message}
                </Typography>

                <Stack
                    direction="column"
                    mt={0.5}
                    gap={0.5}
                    alignItems="flex-start"
                >
                    <Stack direction="row" gap={0.5} alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Property with
                        </Typography>

                        <Link
                            href={propertyHref}
                            passHref
                            style={{ textDecoration: "none" }}
                        >
                            <NormalBadge
                                name={`${t("Code")}: ${
                                    data?.agreement?.property?.code || ""
                                }`}
                                color={"#ffcc00"}
                                sx={{
                                    color: "#854D0E",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "#e6b800",
                                    },
                                }}
                            />
                        </Link>
                    </Stack>

                    <Stack direction="row" gap={0.5} mt={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Property Owner:
                        </Typography>
                        <Link
                            href={customerHref}
                            passHref
                            sx={{
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                                color: "black",
                            }}
                        >
                            {data?.agreement?.owner?.name}
                        </Link>
                    </Stack>
                    <Stack direction="row" gap={0.5} mt={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Expiration Date:
                        </Typography>
                        <Typography variant="body2">
                            {expirationDate}
                        </Typography>
                        {data?.agreement?.expiresSoon && (
                            <Tooltip title="Expires soon" placement="top">
                                <ExpireIcon
                                    color="warning"
                                    sx={{
                                        width: "21px",
                                        height: "21px",
                                    }}
                                />
                            </Tooltip>
                        )}
                        {data?.agreement?.expiredToday && (
                            <Tooltip title="Expired" placement="top">
                                <ExpiredIcon
                                    color="error"
                                    sx={{
                                        width: "21px",
                                        height: "21px",
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export default AgreementDetails;
