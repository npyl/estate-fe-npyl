import { useGetNotificationsQuery } from "src/services/notification";
import Table from "../table";

const Listings = () => {
    const { data: listings } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                // extract ListingNotification from inside ContactNotification
                data?.filter((d) => d.notificationType === "listing"),
        }),
    });

    console.log("got: ", listings);

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <Table
            variant="listing"
            rows={listings || []}
            onRemove={handleRemove}
        />
    );
};

export default Listings;
