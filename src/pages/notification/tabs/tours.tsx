import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
    useToggleNotificationViewedStatusMutation,
} from "src/services/notification";
import Table from "../table";
import { ContactNotification } from "@/types/notification";
import { Box } from "@mui/material";

const Tours = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
    const [toggleNotificationViewedStatus] =
        useToggleNotificationViewedStatusMutation();

    const { data: tours } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                // select only notifications with notificationType !== "listing"
                data?.filter(
                    ({ notificationType }) =>
                        notificationType === "contact" ||
                        notificationType === "tour"
                ) || [],
        }),
    });

    const handleRemove = (index = -1) => {
        deleteNotification(index);
    };

    const handleViewNotification = async (
        notification: ContactNotification
    ) => {
        if (!notification.viewed) {
            await toggleNotificationViewedStatus({
                id: notification.id || 0,
                viewed: true,
            });
        }
    };

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            {" "}
            <Table
                variant="contact"
                rows={tours || []}
                onRemove={handleRemove}
                loading={isLoading}
                onViewNotification={handleViewNotification}
            />
        </Box>
    );
};

export default Tours;
