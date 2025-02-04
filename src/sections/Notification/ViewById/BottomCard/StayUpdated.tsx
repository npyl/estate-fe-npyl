import DemandSection from "@/sections/Customer/ViewById/Demand";
import useGetNotification from "@/sections/Notification/useGetNotification";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const StayUpdated = () => {
    const { t } = useTranslation();

    const { notification } = useGetNotification();
    const demand = notification?.stayUpdatedDetails?.customerDemand;

    return (
        <>
            <Typography variant="h6" pl={3}>
                {t("Demand")}
            </Typography>
            <DemandSection demand={demand} />
        </>
    );
};

export default StayUpdated;
