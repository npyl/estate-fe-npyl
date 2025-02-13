import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { LocalPhone, Email } from "@mui/icons-material";
import useGetNotification from "@/sections/Notification/useGetNotification";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { el } from "date-fns/locale"; // Change to the user's locale dynamically if needed

interface CustomerInfoProps {
    tourType?: string;
    tourDate?: string;
    tourTime?: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
    tourType,
    tourDate,
    tourTime,
}) => {
    const { t, i18n } = useTranslation();

    const { notification } = useGetNotification();
    const { customerEmail, customerMobile } = notification || {};

    // Format date with translation support
    const formattedDate =
        tourDate && tourTime
            ? format(new Date(tourDate), "d MMMM yyyy", {
                  locale: i18n.language === "el" ? el : undefined, // Greek translation if needed
              })
            : "";

    const getTourLabel = (type: string | undefined) => {
        if (type === "inPerson") {
            return (
                <Chip
                    label={t("In Person")}
                    sx={{
                        backgroundColor: "#D1E7DD !important", // Light green
                        color: "#0F5132 !important", // Dark green
                        fontWeight: 600,
                    }}
                    size="small"
                />
            );
        } else if (type === "askQuestion") {
            return (
                <Chip
                    label={t("Contact with customer")}
                    sx={{
                        backgroundColor: "#FDE2E4 !important",
                        color: "#842029 !important",
                        fontWeight: 600,
                    }}
                    size="small"
                />
            );
        }
        return null;
    };

    return (
        <Stack display="flex" flexDirection="column" gap={0.3}>
            {/* Customer Contact Details */}
            <Stack direction="row" gap={7}>
                <Typography display="flex" alignItems="center">
                    <LocalPhone
                        sx={{ color: "black", fontSize: "medium", mr: 1 }}
                    />
                    {customerMobile}
                </Typography>
                <Typography display="flex" alignItems="center">
                    <Email sx={{ color: "black", fontSize: "medium", mr: 1 }} />
                    {customerEmail}
                </Typography>
            </Stack>

            {/* Tour Information */}
            <Stack direction="row" alignItems="center" gap={0.4}>
                <Typography>{t("Tour request")}:</Typography>
                {getTourLabel(tourType)}
                {formattedDate || tourTime ? (
                    <Typography>
                        {"- "}
                        {formattedDate} {tourTime}
                    </Typography>
                ) : null}
            </Stack>
        </Stack>
    );
};

export default CustomerInfo;
