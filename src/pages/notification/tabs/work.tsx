import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from "src/services/notification";
import Table from "../table";

const WorkApplications = () => {
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
    const { data: rows } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                data?.filter(
                    ({ notificationType }) => notificationType === "workForUs"
                ) || [],
        }),
    });

    const handleRemove = (index = -1) => {
        deleteNotification(index);
    };

    return (
        <Table
            variant="workForUs"
            rows={rows || []}
            onRemove={handleRemove}
            loading={isLoading}
        />
    );
};

export default WorkApplications;
