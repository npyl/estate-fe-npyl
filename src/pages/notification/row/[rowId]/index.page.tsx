import {
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import { AdminGuard } from "src/components/authentication/admin-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import type { NextPage } from "next";

import { useGetNotificationByIdQuery } from "@/services/notification";

import { useRouter } from "next/router";
import {
    useGetPropertyByCodeQuery,
    useLazyGetPropertyByCodeQuery,
} from "@/services/properties";
import { t } from "i18next";
import { LocalPhone } from "@mui/icons-material";
import { NormalBadge } from "@/components/PropertyCard/styled";
import PropertyCard from "@/components/PropertyCard/Horizontal";
import { useEffect } from "react";
import { format } from "date-fns";

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

    // Lazy triggering the getProperty to get rid of the fetch error .
    // useEffect(() => {
    //     if (propertyCode) {
    //         trigger(propertyCode);
    //     }
    // }, [propertyCode, trigger]);

    if (error || !data) {
        return <Typography>Error loading notification</Typography>;
    }
    const property = data?.property;

    const handlePropertyCodeClick = () => {
        if (property) {
            router.push(`/property/${property?.id}`);
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

    // Filtering true positions
    const truePositions = workForUs
        ? (Object.keys(workForUs.positions) as (keyof Positions)[]).filter(
              (key) => workForUs.positions[key]
          )
        : [];

    return (
        <Box>
            <Card sx={{ marginBottom: 2, padding: 2 }}>
                <CardContent>
                    {property ? (
                        <Typography
                            variant="h5"
                            gutterBottom
                            borderBottom="1px solid lightgray"
                            pb={1}
                        >
                            {t("Tour request details")}
                        </Typography>
                    ) : listing ? (
                        <Typography
                            variant="h5"
                            gutterBottom
                            borderBottom="1px solid lightgray"
                            pb={1}
                        >
                            {t("Listing  details")}
                        </Typography>
                    ) : (
                        <>
                            {" "}
                            <Typography
                                variant="h5"
                                gutterBottom
                                borderBottom="1px solid lightgray"
                                pb={1}
                            >
                                {t("Work application details")}
                            </Typography>
                        </>
                    )}

                    <Stack
                        direction="row"
                        width="100%"
                        justifyContent="space-between"
                    >
                        <Typography variant="h6">{customerName}</Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="right"
                        >
                            {format(new Date(notificationDate), "dd MMM yyyy")}
                        </Typography>
                    </Stack>

                    <Stack direction="column" mt={2}>
                        <Box display="flex" flexDirection="row" gap={7}>
                            <Typography display="flex" alignItems="center">
                                {" "}
                                <LocalPhone
                                    sx={{
                                        color: "black",
                                        fontSize: "medium",
                                        mr: 1,
                                    }}
                                />
                                {customerMobile}
                            </Typography>
                            <Typography display="flex" alignItems="center">
                                {" "}
                                <EmailIcon
                                    sx={{
                                        color: "black",
                                        fontSize: "medium",
                                        mr: 1,
                                    }}
                                />
                                {customerEmail}
                            </Typography>
                        </Box>
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
                                <Typography>{listing?.description}</Typography>
                            </>
                        ) : null}
                    </Stack>
                </CardContent>
            </Card>
            <Card
                onClick={handlePropertyCodeClick}
                sx={{
                    boxShadow: 1,
                    "&:hover": {
                        boxShadow: 18,
                        cursor: "pointer",
                    },
                }}
            >
                <Stack direction="row">
                    {workForUs ? null : (
                        <CardMedia
                            component="img"
                            image={property?.thumbnail || listing?.photo || ""}
                            alt=""
                            sx={{ width: "250px", maxHeight: "180px", p: 1 }}
                        />
                    )}
                    {workForUs ? (
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={7}
                            ml={3}
                            justifyContent="center"
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                            >
                                <Typography fontWeight="bold">
                                    Location:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {workForUs?.workRegion?.nameGR}
                                </Typography>
                            </Stack>
                            <Stack flexDirection="row">
                                <Typography fontWeight="bold">
                                    Working positions:
                                </Typography>
                                <Box
                                    flexDirection="row"
                                    display="flex"
                                    gap={2}
                                    ml={2}
                                >
                                    {truePositions.map((position) => (
                                        <li key={position}>{position}</li>
                                    ))}
                                </Box>
                            </Stack>
                        </Stack>
                    ) : null}
                    <CardContent sx={{ ml: 5 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            {property ? (
                                <Typography variant="h6">
                                    {property?.descriptions?.el?.title}
                                </Typography>
                            ) : null}

                            {listing ? (
                                <Typography variant="h6">
                                    {listing?.title}
                                </Typography>
                            ) : null}
                        </Stack>
                        {property ? (
                            <>
                                <Typography variant="body2" mt={2}>
                                    {property?.category.value} |{" "}
                                    {property?.area} m² | {property?.price}{" "}
                                    {property?.state?.key === "RENT"
                                        ? "€/μήνα"
                                        : "€"}
                                </Typography>
                                <Typography variant="body2">
                                    {property?.regionGR}
                                    {property?.regionGR ? ", " : ""}
                                    {property?.cityGR}
                                    {property?.cityGR &&
                                    (property?.street || property?.number)
                                        ? ", "
                                        : ""}
                                    {property?.street} {property?.number}
                                </Typography>
                            </>
                        ) : null}

                        {listing ? (
                            <>
                                <Typography variant="body2" mt={2}>
                                    {listing?.category.value} | {listing?.area}{" "}
                                    m² | {listing?.price}{" "}
                                    {listing?.state?.key === "RENT"
                                        ? "€/μήνα"
                                        : "€"}
                                </Typography>
                                <Typography variant="body2">
                                    {listing?.location?.region},{" "}
                                    {listing?.location.city}
                                    {", "}
                                    {listing?.location.street}{" "}
                                    {listing?.location.number}
                                </Typography>
                            </>
                        ) : null}

                        <Stack mt={3} gap={2} direction="row">
                            {property ? (
                                <>
                                    <NormalBadge
                                        name={`${property?.state?.value}`}
                                        color="#3730a3"
                                        sx={{ width: "50%", color: "#3730a3" }}
                                    />

                                    <NormalBadge
                                        name={`${t("Code")}: ${
                                            property?.code || ""
                                        }`}
                                        color="#ffcc00"
                                        sx={{
                                            width: "100%",
                                            color: "#854D0E",
                                        }}
                                    />
                                </>
                            ) : null}

                            {listing ? (
                                <>
                                    <NormalBadge
                                        name={`${listing?.state?.value}`}
                                        color="#3730a3"
                                        sx={{ width: "50%", color: "#3730a3" }}
                                    />
                                </>
                            ) : null}
                        </Stack>
                    </CardContent>
                </Stack>
            </Card>
        </Box>
    );
};
NotificationDetailPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationDetailPage;
