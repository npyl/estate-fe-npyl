import {
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { useRouter } from "next/router";
import { FC } from "react";
import { NotificationType } from "@/types/notification";
import { useTranslation } from "react-i18next";
import { IPropertyForNotification } from "@/types/notification/notification";
const WorkDetails = dynamic(() => import("./WorkDetails"));
const TourPropertyBadges = dynamic(() => import("./TourPropertyBadges"));
const ListingStateBadge = dynamic(() => import("./ListingStateBadge"));
const TourPropertyDetails = dynamic(() => import("./TourPropertyDetails"));
const ListingPropertyDetails = dynamic(
    () => import("./ListingPropertyDetails")
);
const StayUpdated = dynamic(() => import("./StayUpdated"));
import dynamic from "next/dynamic";

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
    property?: IPropertyForNotification;
}

const BottomCard: FC<BottomCardProps> = ({ type, property }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { rowId } = router.query;

    const { workForUs } = useGetNotificationByIdQuery(+rowId!, {
        skip: !rowId,
        selectFromResult: ({ data }) => ({
            workForUs: data?.workForUsDetails,
        }),
    });

    const { listing } = useGetNotificationByIdQuery(+rowId!, {
        skip: !rowId,
        selectFromResult: ({ data }) => ({
            listing: data?.listingDetails,
        }),
    });

    // Filtering true work positions
    const truePositions = workForUs
        ? (Object.keys(workForUs.positions) as (keyof Positions)[]).filter(
              (key) => workForUs.positions[key]
          )
        : [];

    const handlePropertyCodeClick = () => {
        if (property) {
            router.push(`/property/${property?.id}`);
        } else {
            return;
        }
    };

    return (
        <>
            {/* SECOND CARD IN UI */}
            <Card
                onClick={handlePropertyCodeClick}
                sx={{
                    boxShadow: 1,
                    "&:hover": property
                        ? {
                              boxShadow: 18,
                              cursor: "pointer",
                          }
                        : {},
                }}
            >
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

                {type === "STAY_UPDATED" ? (
                    <StayUpdated rowId={+rowId!} />
                ) : null}
            </Card>
        </>
    );
};

export default BottomCard;
