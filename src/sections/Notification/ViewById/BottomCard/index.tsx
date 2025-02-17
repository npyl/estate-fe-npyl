import {
    Box,
    Stack,
    Typography,
    CardContent,
    CardMedia,
    SxProps,
    Theme,
} from "@mui/material";
import { forwardRef } from "react";
import { NotificationType } from "@/types/notification";
import { useTranslation } from "react-i18next";
const WorkDetails = dynamic(() => import("./WorkDetails"));
const TourPropertyBadges = dynamic(() => import("./TourPropertyBadges"));
const ListingStateBadge = dynamic(() => import("./ListingStateBadge"));
const TourPropertyDetails = dynamic(() => import("./TourPropertyDetails"));
const ListingPropertyDetails = dynamic(
    () => import("./ListingPropertyDetails")
);
const StayUpdated = dynamic(() => import("./StayUpdated"));
import dynamic from "next/dynamic";
import useGetNotification from "@/sections/Notification/useGetNotification";
import PrintableCard from "./PrintableCard";
import { BottomCardRef } from "./types";

const CardSx: SxProps<Theme> = {
    boxShadow: 1,
    "&:hover": {
        boxShadow: 18,
        cursor: "pointer",
    },
};

type Positions = {
    advisor: boolean;
    external: boolean;
    marketing: boolean;
    informatics: boolean;
    photography: boolean;
    secretary: boolean;
};

interface BottomCardProps {
    type: NotificationType;
}

const BottomCard = forwardRef<BottomCardRef, BottomCardProps>(
    ({ type }, ref) => {
        const { t } = useTranslation();

        const { notification } = useGetNotification();
        const {
            property,
            workForUsDetails: workForUs,
            listingDetails: listing,
        } = notification || {};

        // Filtering true work positions
        const truePositions = workForUs
            ? (Object.keys(workForUs.positions) as (keyof Positions)[]).filter(
                  (key) => workForUs.positions[key]
              )
            : [];

        return (
            <PrintableCard ref={ref} sx={CardSx}>
                <Stack direction="row">
                    {/* IMAGE */}
                    {type === "WORK_FOR_US" ||
                    type === "STAY_UPDATED" ? null : (
                        <CardMedia
                            component="img"
                            image={property?.thumbnail || listing?.photo || ""}
                            alt=""
                            sx={{
                                width: "250px",
                                maxHeight: "180px",
                                p: 1,
                            }}
                        />
                    )}

                    {workForUs ? (
                        <Box p={1}>
                            <WorkDetails
                                workForUs={workForUs}
                                truePositions={truePositions}
                            />
                        </Box>
                    ) : null}

                    <CardContent sx={{ ml: 5 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            {type === "LISTING" ? (
                                <Stack direction={"column"}>
                                    <Typography variant="h6">
                                        {listing?.title}
                                    </Typography>

                                    <ListingPropertyDetails listing={listing} />
                                    <Stack mt={3} gap={2} direction="row">
                                        <ListingStateBadge
                                            stateValue={
                                                t(
                                                    listing?.state?.value ?? ""
                                                ) || ""
                                            }
                                        />
                                    </Stack>
                                </Stack>
                            ) : null}

                            {(type === "TOUR" || type === "REVIEW") && (
                                <Stack>
                                    <Typography variant="h6">
                                        {property?.descriptions?.el?.title}
                                    </Typography>
                                    <TourPropertyDetails property={property} />

                                    <Stack mt={3} gap={2} direction="row">
                                        <TourPropertyBadges
                                            stateValue={t(
                                                property?.state?.value || ""
                                            )}
                                            code={property?.code || ""}
                                        />
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </CardContent>
                </Stack>

                {type === "STAY_UPDATED" ? <StayUpdated /> : null}
            </PrintableCard>
        );
    }
);

BottomCard.displayName = "BottomCard";

export default BottomCard;
