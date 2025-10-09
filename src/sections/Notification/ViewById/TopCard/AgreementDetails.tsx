import { Stack, Typography, Tooltip } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ExpireIcon from "@mui/icons-material/AccessTime";
import ExpiredIcon from "@mui/icons-material/Error";
// Adjust the path as necessary
import Link from "@/components/Link";
import useGetNotification from "@/sections/Notification/useGetNotification";
import CodeBadgeLink from "@/ui/Property/CodeBadgeLink";

const AgreementDetails = () => {
    const { t } = useTranslation();

    const { notification } = useGetNotification();

    const { notificationDate, agreement, message } = notification || {};

    const expirationDate = agreement?.expirationDate
        ? format(new Date(agreement?.expirationDate), "dd MMMM yyyy")
        : "";

    const propertyHref = `/property/${agreement?.property?.id}`;
    const customerHref = `/customer/${agreement?.owner?.id}`;

    return (
        <>
            <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
                mt={1}
            >
                <Typography variant="h6">{agreement?.title}</Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="right"
                >
                    {notificationDate
                        ? format(new Date(notificationDate), "dd MMM yyyy")
                        : ""}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="body2" mt={0.5}>
                    {message}
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

                        <CodeBadgeLink
                            propertyId={agreement?.property?.id!}
                            code={`${t("Code")}: ${
                                agreement?.property?.code || ""
                            }`}
                        />
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
                            {agreement?.owner?.name}
                        </Link>
                    </Stack>
                    <Stack direction="row" gap={0.5} mt={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Expiration Date:
                        </Typography>
                        <Typography variant="body2">
                            {expirationDate}
                        </Typography>
                        {agreement?.expiresSoon && (
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
                        {agreement?.expiredToday && (
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
