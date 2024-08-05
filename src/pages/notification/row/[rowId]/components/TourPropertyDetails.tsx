import React from "react";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { IPropertyForNotification } from "@/types/notification/notification";

const formatPrice = (price: number | undefined) => {
    if (price != null) {
        return new Intl.NumberFormat("de-DE").format(price); // 'de-DE' uses dot as thousand separator
    }
    return "";
};

interface TourPropertyDetailsProps {
    property: IPropertyForNotification | undefined;
}

const TourPropertyDetails: React.FC<TourPropertyDetailsProps> = ({
    property,
}) => {
    if (!property) return null;

    return (
        <>
            <Typography variant="body2" mt={2}>
                {property.category.value} | {property.area} m² |{" "}
                {formatPrice(property.price)}{" "}
                {property.state.key === "RENT" ? t("€/month") : "€"}
            </Typography>
            <Typography variant="body2">
                {property.regionGR}
                {property.regionGR ? ", " : ""}
                {property.cityGR}
                {property.cityGR && (property.street || property.number)
                    ? ", "
                    : ""}
                {property.street} {property.number}
            </Typography>
        </>
    );
};

export default TourPropertyDetails;
