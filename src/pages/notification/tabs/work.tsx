import { useGetNotificationsQuery } from "src/services/notification";
import Table from "../table";

const WorkApplications = () => {
    const { data: rows } = useGetNotificationsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                data?.filter(
                    ({ notificationType }) => notificationType === "workForUs"
                ) || [],
        }),
    });

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <Table variant="workForUs" rows={rows || []} onRemove={handleRemove} />
    );
};

export default WorkApplications;
