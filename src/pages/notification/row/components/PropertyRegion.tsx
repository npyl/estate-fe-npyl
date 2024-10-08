import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/en"; // English locale
import "dayjs/locale/el"; // Greek locale
import Link from "next/link";
import {
    ContactNotification,
    IPropertyForNotification,
} from "@/types/notification/notification";
import { ListingNotification } from "@/types/notification/listing";

//Mapper gia na exw tous mines stin geniki giati me to dayjs tous fernei like "Αυγουστος".
const greekGenitiveMonths = [
    "Ιανουαρίου",
    "Φεβρουαρίου",
    "Μαρτίου",
    "Απριλίου",
    "Μαΐου",
    "Ιουνίου",
    "Ιουλίου",
    "Αυγούστου",
    "Σεπτεμβρίου",
    "Οκτωβρίου",
    "Νοεμβρίου",
    "Δεκεμβρίου",
];

const formatTourDate = (dateString: any, language?: string) => {
    const date = dayjs(dateString);
    const locale = language === "el" ? "el" : "en";
    if (language === "el") {
        const day = date.format("D");
        const monthIndex = parseInt(date.format("M"), 10) - 1; // Get zero-indexed month
        const year = date.format("YYYY");
        return `${day} ${greekGenitiveMonths[monthIndex]} ${year}`;
    }
    return dayjs(dateString).locale(locale).format("D MMMM YYYY");
};

type TourType = "inPerson" | "askQuestion";

const tourTypeMapper: Record<TourType, string> = {
    inPerson: "In Person",
    askQuestion: "Ask Question",
};

interface PropertyRegionProps {
    propertyDetails?: IPropertyForNotification;
    contactDetails?: ListingNotification;
    row?: ContactNotification;
    handlePropertyCodeClick?: (event: React.MouseEvent) => void;
}

const PropertyRegion: React.FC<PropertyRegionProps> = ({
    propertyDetails,
    contactDetails,
    row,
    handlePropertyCodeClick,
}) => {
    const { i18n, t } = useTranslation();

    const isEnglish = i18n.language === "en";

    const complex = isEnglish
        ? propertyDetails?.complexEN || contactDetails?.location?.complex
        : propertyDetails?.complexGR || contactDetails?.location?.complex;
    const city = isEnglish
        ? propertyDetails?.cityEN || contactDetails?.location?.city
        : propertyDetails?.cityGR || contactDetails?.location?.city;

    return (
        <Box flexDirection="row">
            <Stack direction="row" gap={0.5} alignItems="center">
                <Typography variant="body2">
                    {complex ? `${complex}, ` : ""}
                    {city}
                </Typography>

                {propertyDetails ? (
                    <Stack ml={1.5}>
                        <Link
                            href={`/property/${propertyDetails?.id}`}
                            passHref
                            style={{ textDecoration: "none" }}
                        >
                            <NormalBadge
                                name={`${t("Code")}: ${
                                    propertyDetails?.code || ""
                                }`}
                                color={"#ffcc00"}
                                sx={{
                                    color: (theme) =>
                                        theme.palette.mode === "light"
                                            ? "#854D0E" ||
                                              theme.palette.grey[700] // Fallback to grey if neutral is undefined
                                            : "null",

                                    "&:hover": {
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? "#d4a500" // Subdued color for hover in light mode
                                                : "#b38f00", // Subdued color for hover in dark mode
                                    },
                                }}
                                onClick={handlePropertyCodeClick}
                            />
                        </Link>
                    </Stack>
                ) : null}
            </Stack>
            <Box display="flex" flexDirection="row" gap={0.5}>
                <Typography variant="body2">
                    {t(row?.tourType as TourType)}
                </Typography>
                {row?.tourDate ? (
                    <Typography variant="body2">
                        - {formatTourDate(row?.tourDate, i18n.language)}
                    </Typography>
                ) : null}
                <Typography variant="body2">{row?.tourTime}</Typography>
            </Box>
        </Box>
    );
};

export default PropertyRegion;
