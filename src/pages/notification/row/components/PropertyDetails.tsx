import React from "react";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { IPropertyForNotification } from "@/types/notification/notification";
import { ListingNotification } from "@/types/notification/listing";

const formatPrice = (price: number | undefined) => {
    if (price != null) {
        return new Intl.NumberFormat("de-DE").format(price); // 'de-DE' uses dot as thousand separator
    }
    return "";
};

interface PropertyDetailsProps {
    propertyDetails?: IPropertyForNotification;
    contactDetails?: ListingNotification;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    propertyDetails,
    contactDetails,
}) => {
    return (
        <Box flexDirection="row">
            <Typography variant="body2">
                {propertyDetails?.category?.value ||
                    contactDetails?.category?.value}{" "}
                {t(`for`)}{" "}
                {propertyDetails?.state?.value || contactDetails?.state?.value}{" "}
                {propertyDetails?.area || contactDetails?.area} m² |{" "}
                {formatPrice(propertyDetails?.price) || contactDetails?.price} €
                {propertyDetails?.state?.key === "RENT" ? t(`/month`) : null}
            </Typography>
        </Box>
    );
};

export default PropertyDetails;
