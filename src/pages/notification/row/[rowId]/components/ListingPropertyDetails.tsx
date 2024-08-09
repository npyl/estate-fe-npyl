import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ListingNotification } from "@/types/notification/listing";

interface ListingPropertyDetailsProps {
    listing: ListingNotification | undefined;
}

const ListingPropertyDetails: React.FC<ListingPropertyDetailsProps> = ({
    listing,
}) => {
    const { t } = useTranslation();

    if (!listing) return null;

    return (
        <>
            <Typography variant="body2" mt={2}>
                {listing.category.value} | {listing.area} m² | {listing.price}{" "}
                {listing.state.key === "RENT" ? t("€/month") : "€"}
            </Typography>
            <Typography variant="body2">
                {listing.location.region}, {listing.location.city}
                {", "}
                {listing.location.street} {listing.location.number}
            </Typography>
        </>
    );
};

export default ListingPropertyDetails;
