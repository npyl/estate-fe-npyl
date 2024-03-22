import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from "src/services/notification";
import Table from "../table";

const Tours = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
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
    return (
        <Table
            variant="contact"
            rows={tours || []}
            onRemove={handleRemove}
            loading={isLoading}
        />
    );
};

export default Tours;
