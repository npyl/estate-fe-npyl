import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
    useToggleNotificationViewedStatusMutation,
} from "src/services/notification";
import Table from "../table";
import { ContactNotification } from "@/types/notification";

const Listings = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
    const [toggleNotificationViewedStatus] =
        useToggleNotificationViewedStatusMutation();
    const { data: listings } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                // extract ListingNotification from inside ContactNotification
                data?.filter((d) => d.notificationType === "listing"),
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
            variant="listing"
            rows={listings || []}
            onRemove={handleRemove}
            loading={isLoading}
            onViewNotification={handleViewNotification}
        />
    );
};

export default Listings;
