import DemandSection from "@/sections/Customer/ViewById/Demand";
import { useGetNotificationByIdQuery } from "@/services/notification";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface StayUpdatedProps {
    rowId: number;
}

const StayUpdated: FC<StayUpdatedProps> = ({ rowId }) => {
    const { t } = useTranslation();

    const { demand } = useGetNotificationByIdQuery(rowId, {
        selectFromResult: ({ data }) => ({
            demand: data?.stayUpdatedDetails?.customerDemand,
        }),
    });

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
