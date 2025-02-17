import { Stack, Typography, Card, CardContent } from "@mui/material";
import { format } from "date-fns";
import CustomerInfo from "./CustomerInfo";
import PropertyRating from "./PropertyRating";
import TitleSection from "./TitleSection";
import dynamic from "next/dynamic";
import CustomerName from "./CustomerName";
import { useTranslation } from "react-i18next";
import el from "date-fns/locale/el";
import enGB from "date-fns/locale/en-GB";
import useGetNotification from "@/sections/Notification/useGetNotification";
import { NotificationType } from "@/types/notification";
import { FC } from "react";
const AgreementDetails = dynamic(() => import("./AgreementDetails"));

interface TopCardProps {
    type: NotificationType;
    onPrint: VoidFunction;
}

const TopCard: FC<TopCardProps> = ({ type, onPrint }) => {
    const { t, i18n } = useTranslation();

    const { notification } = useGetNotification();
    const {
        message,
        notificationDate,
        listingDetails: listing,
        reviewDetails,
        tourType,
        tourTime,
        tourDate,
    } = notification || {};

    const locale = i18n.language === "el" ? el : enGB;

    return (
        <>
            <Card sx={{ mb: 1 }}>
                <CardContent>
                    <TitleSection type={type} onPrint={onPrint} />

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
                                    {notificationDate
                                        ? format(
                                              new Date(notificationDate),
                                              "dd MMM yyyy",
                                              { locale }
                                          )
                                        : ""}
                                </Typography>
                            </Stack>
                            <Stack direction="column" mt={1}>
                                <CustomerInfo
                                    tourType={tourType}
                                    tourDate={tourDate}
                                    tourTime={tourTime}
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
                                        <Typography fontWeight="bold" mt={1}>
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
