import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import { AdminGuard } from "src/components/authentication/admin-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import type { NextPage } from "next";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import CustomerInfo from "../components/CustomerInfo";
import PropertyRating from "./components/PropertyRating";
import TitleSection from "./components/TitleSection";
import enGB from "date-fns/locale/en-GB";
import el from "date-fns/locale/el";
import dynamic from "next/dynamic";
import { NotificationType } from "@/types/notification";
import CustomerName from "./CustomerName";
const AgreementDetails = dynamic(() => import("./components/AgreementDetails"));
const BottomCard = dynamic(() => import("./BottomCard"));

const NotificationDetailPage: NextPage = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { rowId } = router.query;

    const { data, error } = useGetNotificationByIdQuery(+rowId!);

    const { data: listing } = useGetNotificationByIdQuery(+rowId!, {
        skip: !rowId,
        selectFromResult: ({ data }) => ({
            data: data?.listingDetails,
        }),
    });

    if (error || !data) return null;

    const type = data?.type?.key as NotificationType;
    const reviewDetails = data?.reviewDetails;

    const { message, notificationDate } = data;

    const locale = i18n.language === "el" ? el : enGB;

    return (
        <Box>
            {/* FIRST CARD IN UI */}

            <Card sx={{ mb: 1 }}>
                <CardContent>
                    <TitleSection
                        type={type}
                        agreementVariant={data?.agreement?.variant?.value}
                        isAgreementActive={data?.agreement?.active}
                        data={data}
                    />

                    {type !== "AGREEMENT" ? (
                        <>
                            <Stack
                                direction="row"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <CustomerName />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    align="right"
                                >
                                    {format(
                                        new Date(notificationDate),
                                        "dd MMM yyyy",
                                        { locale }
                                    )}
                                </Typography>
                            </Stack>
                            <Stack direction="column" mt={2}>
                                <CustomerInfo />

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
                            </Stack>
                        </>
                    ) : null}

                    {type === "AGREEMENT" ? (
                        <AgreementDetails data={data} />
                    ) : null}
                </CardContent>
            </Card>

            {type !== "AGREEMENT" ? <BottomCard type={type} /> : null}
        </Box>
    );
};

NotificationDetailPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationDetailPage;
