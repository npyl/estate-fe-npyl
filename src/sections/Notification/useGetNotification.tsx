import { useGetNotificationByIdQuery } from "@/services/notification";
import { useRouter } from "next/router";

const useGetNotification = () => {
    const router = useRouter();
    const { rowId } = router.query;
    const { data: notification, ...other } = useGetNotificationByIdQuery(
        +rowId!
    );
    return { notification, ...other };
};

export default useGetNotification;
