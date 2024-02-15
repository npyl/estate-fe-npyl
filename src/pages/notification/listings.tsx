import { useGetNotificationsQuery } from "src/services/notification";
import CollapsibleTable from "./table";

const Listings = () => {
    const { data: listings } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                // extract ListingNotification from inside ContactNotification
                data?.filter((d) => d.notificationType === "listing"),
            // ?.map(({ listingDetails }) => listingDetails) || [],
        }),
    });

    console.log("got: ", listings);

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <CollapsibleTable
            variant="listing"
            rows={listings || []}
            onRemove={handleRemove}
        />
    );
};

export default Listings;
