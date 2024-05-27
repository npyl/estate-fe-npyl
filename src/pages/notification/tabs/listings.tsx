import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from "src/services/notification";
import Table from "../table";

const Listings = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
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
    console.log(listings);
    return (
        <Table
            variant="listing"
            rows={listings || []}
            onRemove={handleRemove}
            loading={isLoading}
        />
    );
};

export default Listings;
