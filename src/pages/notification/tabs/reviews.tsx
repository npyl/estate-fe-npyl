import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from "src/services/notification";
import Table from "../table";

const Listings = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const { data: reviews } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                // extract ListingNotification from inside ContactNotification
                data?.filter((d) => d.notificationType === "review"),
        }),
    });

    const handleRemove = (index = -1) => {
        deleteNotification(index);
    };

    return (
        <Table
            variant="review"
            rows={reviews || []}
            onRemove={handleRemove}
            loading={isLoading}
        />
    );
};

export default Listings;
