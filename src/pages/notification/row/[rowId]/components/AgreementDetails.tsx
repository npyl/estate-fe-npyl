import React from "react";
import { Stack, Typography, Tooltip } from "@mui/material";
import { format } from "date-fns";
import { t } from "i18next";
import ExpireIcon from "@mui/icons-material/AccessTime";
import ExpiredIcon from "@mui/icons-material/Error";
// Adjust the path as necessary
import Link from "next/link";
import { NormalBadge } from "@/components/PropertyCard/styled";
import router from "next/router";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { ContactNotificationExtended } from "@/types/notification";

interface AgreementDetailsProps {
    data: ContactNotificationExtended;
    handlePropertyCodeClick: () => void;
    handleCustomerNameClick: () => void;
}

const AgreementDetails: React.FC<AgreementDetailsProps> = ({
    data,
    handlePropertyCodeClick,
    handleCustomerNameClick,
}) => {
    const expirationDate = data?.agreement?.expirationDate
        ? format(new Date(data?.agreement?.expirationDate), "dd MMMM yyyy")
        : "";
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
                            href={`/property/${data?.agreement?.property?.id}`}
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
                                onClick={handlePropertyCodeClick}
                            />
                        </Link>
                    </Stack>

                    <Stack direction="row" gap={0.5} mt={0.5}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            onClick={handleCustomerNameClick}
                        >
                            {" "}
                            Property Owner{": "}
                        </Typography>
                        <Link
                            href={`/customer/${data?.agreement?.owner?.id}`}
                            passHref
                            style={{
                                textDecoration: "none",
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
