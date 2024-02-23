import { useGetNotificationsQuery } from "src/services/notification";
import Table from "../table";

const Tours = () => {
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

    const handleRemove = (index: number) =>
        console.log("will delete notification: ", index);

    return (
        <Table variant="contact" rows={tours || []} onRemove={handleRemove} />
    );
};

export default Tours;
