import React from "react";
import { Stack, Typography, Rating } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { useTranslation } from "react-i18next";

interface PropertyRatingProps {
    comment: string;
    propertyRating: number;
    presentationRating: number;
}

const PropertyRating: React.FC<PropertyRatingProps> = ({
    comment,
    propertyRating,
    presentationRating,
}) => {
    const { t } = useTranslation();

    return (
        <Stack mt={1}>
            <Stack mt={1} flexDirection="row" gap={1} alignItems="center">
                <CommentIcon sx={{ width: 18, height: 18 }} />
                <Typography>{comment}</Typography>
            </Stack>

            <Stack direction="row" gap={0.5}>
                <Typography>{t("Property Rating")}:</Typography>
                <Rating
                    name="property-rating"
                    value={propertyRating || 0}
                    precision={0.5}
                    readOnly
                />
            </Stack>
            <Stack direction="row" gap={0.5}>
                <Typography>{t("Property Presentation")}:</Typography>
                <Rating
                    name="presentation-rating"
                    value={presentationRating || 0}
                    precision={0.5}
                    readOnly
                />
            </Stack>
        </Stack>
    );
};

export default PropertyRating;
