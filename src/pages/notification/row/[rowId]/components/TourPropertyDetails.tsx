import React from "react";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { IPropertyForNotification } from "@/types/notification/notification";

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
                {property.price}{" "}
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
