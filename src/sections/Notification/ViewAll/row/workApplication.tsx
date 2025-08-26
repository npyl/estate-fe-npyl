import { useGetNotificationByIdQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface ListingRowProps {
    row: ContactNotification;
    filter: any;
}

const WorkApplication = ({ row, filter }: ListingRowProps) => {
    const { data: workForUs } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id,
        selectFromResult: ({ data }) => ({
            data: data?.workForUsDetails,
        }),
    });

    return <BasicRow row={row} filter={filter} workDetails={workForUs} />;
};

export default WorkApplication;
