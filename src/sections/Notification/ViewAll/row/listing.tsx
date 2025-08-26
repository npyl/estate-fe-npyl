import { useGetNotificationByIdQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface ListingRowProps {
    row: ContactNotification;
    filter: any;
}

const ListingRow = ({ row, filter }: ListingRowProps) => {
    const { data: listing } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id,
        selectFromResult: ({ data }) => ({
            data: data?.listingDetails,
        }),
    });

    return <BasicRow row={row} filter={filter} contactDetails={listing} />;
};

export default ListingRow;
