import useGetNotification from "@/sections/Notification/useGetNotification";
import { NotificationType } from "@/types/notification";
import TopCard from "./TopCard";
import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";
import { BottomCardRef } from "./BottomCard/types";
const BottomCard = dynamic(() => import("./BottomCard"));

const ViewNotificationById = () => {
    const { notification } = useGetNotification();
    const type = notification?.type?.key as NotificationType;

    const bottomCardRef = useRef<BottomCardRef>(null);
    const handlePrint = useCallback(() => bottomCardRef.current?.print(), []);

    return (
        <>
            <TopCard type={type} onPrint={handlePrint} />
            {type !== "AGREEMENT" ? (
                <BottomCard ref={bottomCardRef} type={type} />
            ) : null}
        </>
    );
};

export default ViewNotificationById;
