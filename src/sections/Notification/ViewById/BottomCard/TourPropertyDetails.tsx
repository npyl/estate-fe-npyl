import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
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
    const { t, i18n } = useTranslation();

    if (!property) return null;

    const isEnglish = i18n.language === "en";
    return (
        <>
            <Typography variant="body2" mt={2}>
                {t(property.category.value)} | {property.area} m² |{" "}
                {formatPrice(property.price)}{" "}
                {property.state.key === "RENT" ? t("€/month") : "€"}
            </Typography>
            <Typography variant="body2">
                {isEnglish ? property.complexEN : property.complexGR}
                {isEnglish
                    ? property.regionEN
                        ? ", "
                        : ""
                    : property.regionGR
                    ? ", "
                    : ""}
                {isEnglish ? property.cityEN : property.cityGR}
                {(isEnglish ? property.cityEN : property.cityGR) &&
                (property.street || property.number)
                    ? ", "
                    : ""}
                {property.street} {property.number}
            </Typography>
        </>
    );
};

export default TourPropertyDetails;
