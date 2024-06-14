import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from "src/services/notification";
import Table from "../table";

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

    return (
        <Table
            variant="review"
            rows={rows || []}
            onRemove={handleRemove}
            loading={isLoading}
        />
    );
};

export default Reviews;
