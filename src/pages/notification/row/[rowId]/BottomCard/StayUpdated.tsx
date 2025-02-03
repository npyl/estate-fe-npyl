import DemandSection from "@/sections/Customer/ViewById/Demand";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { FC } from "react";

interface StayUpdatedProps {
    rowId: number;
}

const StayUpdated: FC<StayUpdatedProps> = ({ rowId }) => {
    const { demand } = useGetNotificationByIdQuery(rowId, {
        selectFromResult: ({ data }) => ({
            demand: data?.stayUpdatedDetails?.customerDemand,
        }),
    });

    return <DemandSection demand={demand} />;
};

export default StayUpdated;
