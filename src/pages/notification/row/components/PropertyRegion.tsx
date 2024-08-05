import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { NormalBadge } from "@/components/PropertyCard/styled";
import { t } from "i18next";
import dayjs from "dayjs";
import Link from "next/link";
import {
    ContactNotification,
    IPropertyForNotification,
} from "@/types/notification/notification";
import { ListingNotification } from "@/types/notification/listing";

const formatTourDate = (dateString: any) => {
    return dayjs(dateString).format("D MMMM YYYY");
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
    return (
        <Box flexDirection="row">
            <Stack direction="row" gap={0.5} alignItems="center">
                <Typography variant="body2">
                    {propertyDetails?.complexGR ||
                    contactDetails?.location?.complex
                        ? `${
                              propertyDetails?.complexGR ||
                              contactDetails?.location?.complex
                          }, `
                        : ""}
                    {propertyDetails?.cityGR || contactDetails?.location?.city}
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
                                    color: "#854D0E",
                                    "&:hover": {
                                        backgroundColor: "#e6b800",
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
                    {tourTypeMapper[row?.tourType as TourType]}
                </Typography>
                {row?.tourDate ? (
                    <Typography variant="body2">
                        {formatTourDate(row?.tourDate)}
                    </Typography>
                ) : null}
                <Typography variant="body2">{row?.tourTime}</Typography>
            </Box>
        </Box>
    );
};

export default PropertyRegion;
