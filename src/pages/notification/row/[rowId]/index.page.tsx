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
    const propertyCode = data?.propertyCode;
    const [trigger, { data: property }] = useLazyGetPropertyByCodeQuery();
    // Lazy triggering the getProperty to get rid of the fetch error .
    useEffect(() => {
        if (propertyCode) {
            trigger(propertyCode);
        }
    }, [propertyCode, trigger]);

    if (error || !data) {
        return <Typography>Error loading notification</Typography>;
    }

    const handlePropertyCodeClick = () => {
        router.push(`/property/${property?.id}`);
    };

    const {
        customerName,
        customerEmail,
        customerMobile,
        message,
        notificationDate,

        viewed,
    } = data;

    return (
        <Box>
            <Card sx={{ marginBottom: 2, padding: 2 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        borderBottom="1px solid lightgray"
                        pb={1}
                    >
                        {t("Tour request details")}
                    </Typography>
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

                        <Typography fontWeight="bold" mt={3}>
                            {t("Message")}
                        </Typography>
                        <Typography>{message}</Typography>
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
                    <CardMedia
                        component="img"
                        image={property?.propertyImage.url || ""}
                        alt="property image"
                        sx={{ width: "250px", p: 1 }}
                    />
                    <CardContent>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Typography variant="h6">
                                {property?.descriptions.el.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                align="right"
                            >
                                {/* {format(
                                    new Date(property?.createdAt || ""),
                                    "dd MMM yyyy"
                                )} */}
                            </Typography>
                        </Stack>

                        <Typography variant="body2">
                            {property?.category.value} | {property?.area} τ.μ. |{" "}
                            {property?.price} €/μήνα
                        </Typography>
                        <Typography variant="body2">
                            {property?.location.city} (
                            {property?.location.street}{" "}
                            {property?.location.number})
                        </Typography>

                        <Stack mt={2} gap={2}>
                            <NormalBadge
                                name={`${property?.state?.value}`}
                                color="#ffcc00"
                                sx={{ width: "50%", color: "#854D0E" }}
                            />

                            <NormalBadge
                                name={`${property?.code}`}
                                color="#854D0E"
                                sx={{ width: "50%", color: "#854D0E" }}
                            />
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
