import useGetNotification from "@/sections/Notification/useGetNotification";
import { NotificationType } from "@/types/notification";
import TopCard from "./TopCard";
import dynamic from "next/dynamic";
const BottomCard = dynamic(() => import("./BottomCard"));

const ViewNotificationById = () => {
    const { notification } = useGetNotification();
    const type = notification?.type?.key as NotificationType;

    return (
        <>
            <TopCard />
            {type !== "AGREEMENT" ? <BottomCard type={type} /> : null}
        </>
    );
};

export default ViewNotificationById;
