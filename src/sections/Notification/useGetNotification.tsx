import { useGetNotificationByIdQuery } from "@/services/notification";
import { toNumberSafe } from "@/utils/toNumber";
import { useRouter } from "next/router";

const useGetNotification = () => {
    const router = useRouter();
    const { rowId } = router.query;

    const iRowId = toNumberSafe(rowId);

    const { data: notification, ...other } =
        useGetNotificationByIdQuery(iRowId);

    return { notificationId: iRowId, notification, ...other };
};

export default useGetNotification;
