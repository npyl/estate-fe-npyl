import {
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";

import { AdminGuard } from "src/components/authentication/admin-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import type { NextPage } from "next";

import { useGetNotificationByIdQuery } from "@/services/notification";

import { useRouter } from "next/router";
import { t } from "i18next";
import { format } from "date-fns";
import WorkDetails from "./components/WorkDetails";
import AgreementDetails from "./components/AgreementDetails";
import TourPropertyBadges from "./components/TourPropertyBadges";
import ListingStateBadge from "./components/ListingStateBadge";
import CustomerInfo from "../components/CustomerInfo";
import PropertyRating from "./components/PropertyRating";
import TourPropertyDetails from "./components/TourPropertyDetails";
import ListingPropertyDetails from "./components/ListingPropertyDetails";
import TitleSection from "./components/TitleSection";

const NotificationDetailPage: NextPage = () => {
    const router = useRouter();
    const { rowId } = router.query;
    const { data, isLoading, error } = useGetNotificationByIdQuery(
        Number(rowId)
    );

    const { data: listing } = useGetNotificationByIdQuery(+rowId!, {
        skip: !rowId && !open,
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.listingDetails,
            isLoading,
        }),
    });

    const { data: workForUs } = useGetNotificationByIdQuery(+rowId!, {
        skip: !rowId && !open,
        selectFromResult: ({ data }) => ({
            data: data?.workForUsDetails,
        }),
    });

    if (error || !data) {
        return <Typography>Error loading notification</Typography>;
    }
    const property = data?.property;
    const type = data?.type?.key;
    const reviewDetails = data?.reviewDetails;

    const handlePropertyCodeClick = () => {
        if (property) {
            router.push(`/property/${property?.id}`);
        } else {
            return;
        }
    };

    const handleCustomerNameClick = () => {
        if (property) {
            router.push(`/custromer/${data?.agreement?.owner?.id}`);
        } else {
            return;
        }
    };

    const {
        customerName,
        customerEmail,
        customerMobile,
        message,
        notificationDate,

        viewed,
    } = data;

    type Positions = {
        advisor: boolean;
        external: boolean;
        marketing: boolean;
        informatics: boolean;
        photography: boolean;
        secretary: boolean;
    };

    // Filtering true work positions
    const truePositions = workForUs
        ? (Object.keys(workForUs.positions) as (keyof Positions)[]).filter(
              (key) => workForUs.positions[key]
          )
        : [];

    return (
        <Box>
            {/* FIRST CARD IN UI */}

            <Card sx={{ marginBottom: 2, padding: 2 }}>
                <CardContent>
                    <TitleSection
                        type={type}
                        agreementVariant={data?.agreement?.variant?.value}
                        isAgreementActive={data?.agreement?.active}
                    />

                    {type !== "AGREEMENT" ? (
                        <>
                            {" "}
                            <Stack
                                direction="row"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <Typography variant="h6">
                                    {customerName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    align="right"
                                >
                                    {format(
                                        new Date(notificationDate),
                                        "dd MMM yyyy"
                                    )}
                                </Typography>
                            </Stack>
                            <Stack direction="column" mt={2}>
                                <CustomerInfo
                                    customerEmail={customerEmail}
                                    customerMobile={customerMobile}
                                />
                                {type === "REVIEW" ? (
                                    <PropertyRating
                                        comment={reviewDetails?.comment || ""}
                                        propertyRating={
                                            reviewDetails?.propertyRating || 0
                                        }
                                        presentationRating={
                                            reviewDetails?.propertyRating || 0
                                        }
                                    />
                                ) : null}

                                {message ? (
                                    <>
                                        <Typography fontWeight="bold" mt={3}>
                                            {t("Message")}
                                        </Typography>
                                        <Typography>{message}</Typography>
                                    </>
                                ) : null}
                                {listing?.description ? (
                                    <>
                                        <Typography fontWeight="bold" mt={3}>
                                            {t("Description")}
                                        </Typography>
                                        <Typography>
                                            {listing?.description}
                                        </Typography>
                                    </>
                                ) : null}
                            </Stack>{" "}
                        </>
                    ) : (
                        <AgreementDetails
                            data={data}
                            handleCustomerNameClick={handleCustomerNameClick}
                            handlePropertyCodeClick={handlePropertyCodeClick}
                        />
                    )}
                </CardContent>
            </Card>
            {/* SECOND CARD IN UI */}
            {type !== "AGREEMENT" ? (
                <Card
                    onClick={handlePropertyCodeClick}
                    sx={{
                        boxShadow: 1,
                        "&:hover": {
                            boxShadow: 18,
                            cursor: type === "LISTING" ? null : "pointer",
                        },
                    }}
                >
                    <Stack direction="row">
                        {/* If it is work application it does not have an image */}
                        {workForUs ? null : (
                            <CardMedia
                                component="img"
                                image={
                                    property?.thumbnail || listing?.photo || ""
                                }
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

                                        <ListingPropertyDetails
                                            listing={listing}
                                        />
                                        <Stack mt={3} gap={2} direction="row">
                                            <ListingStateBadge
                                                stateValue={
                                                    listing?.state?.value || ""
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
                                        <TourPropertyDetails
                                            property={property}
                                        />

                                        <Stack mt={3} gap={2} direction="row">
                                            <TourPropertyBadges
                                                stateValue={
                                                    property?.state?.value || ""
                                                }
                                                code={property?.code || ""}
                                            />
                                        </Stack>
                                    </Stack>
                                )}
                            </Stack>
                        </CardContent>
                    </Stack>
                </Card>
            ) : null}
        </Box>
    );
};
NotificationDetailPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationDetailPage;
