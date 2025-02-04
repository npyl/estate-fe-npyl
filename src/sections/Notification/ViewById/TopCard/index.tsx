import { Stack, Typography, Card, CardContent } from "@mui/material";
import { format } from "date-fns";
import CustomerInfo from "./CustomerInfo";
import PropertyRating from "./PropertyRating";
import TitleSection from "./TitleSection";
import dynamic from "next/dynamic";
import CustomerName from "./CustomerName";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { NotificationType } from "@/types/notification";
import el from "date-fns/locale/el";
import enGB from "date-fns/locale/en-GB";
const AgreementDetails = dynamic(() => import("./AgreementDetails"));

const TopCard = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { rowId } = router.query;

    const { data } = useGetNotificationByIdQuery(+rowId!);

    const { data: listing } = useGetNotificationByIdQuery(+rowId!, {
        skip: !rowId,
        selectFromResult: ({ data }) => ({
            data: data?.listingDetails,
        }),
    });

    const type = data?.type?.key as NotificationType;
    const reviewDetails = data?.reviewDetails;

    const { message, notificationDate } = data || {};

    const locale = i18n.language === "el" ? el : enGB;

    return (
        <>
            <Card sx={{ mb: 1 }}>
                <CardContent>
                    <TitleSection type={type} />

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
                                        new Date(notificationDate || ""),
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

                    {type === "AGREEMENT" ? <AgreementDetails /> : null}
                </CardContent>
            </Card>
        </>
    );
};

export default TopCard;
