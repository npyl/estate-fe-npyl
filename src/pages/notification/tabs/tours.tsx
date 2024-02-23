import { useGetNotificationsQuery } from "src/services/notification";
import CollapsibleTable from "../table";

const Tours = () => {
    const { data: tours } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                // select only notifications with notificationType !== "listing"
                data?.filter(
                    ({ notificationType }) => notificationType !== "listing"
                ) || [],
        }),
    });

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <CollapsibleTable
            variant="contact"
            rows={tours || []}
            onRemove={handleRemove}
        />
    );
};

export default Tours;
