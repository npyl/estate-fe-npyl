import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from "src/services/notification";
import Table from "../table";
import { ContactNotification } from "@/types/notification";

const Reviews = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const { data: rows } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                data?.filter(
                    ({ notificationType }) => notificationType === "review"
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
        <Table
            variant="review"
            rows={rows || []}
            onRemove={handleRemove}
            loading={isLoading}
            onViewNotification={handleViewNotification}
        />
    );
};

export default Reviews;
function toggleNotificationViewedStatus(arg0: { id: number; viewed: boolean }) {
    throw new Error("Function not implemented.");
}
