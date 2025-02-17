import useGetNotification from "@/sections/Notification/useGetNotification";
import { NotificationType } from "@/types/notification";
import TopCard from "./TopCard";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Box } from "@mui/material";
import { useReactToPrint } from "react-to-print";
const BottomCard = dynamic(() => import("./BottomCard"));

const ViewNotificationById = () => {
    const { notification } = useGetNotification();
    const type = notification?.type?.key as NotificationType;

    const contentRef = useRef<HTMLDivElement>(null);
    const print = useReactToPrint({ contentRef });

    return (
        <Box ref={contentRef}>
            <TopCard type={type} onPrint={print} />
            {type !== "AGREEMENT" ? <BottomCard type={type} /> : null}
        </Box>
    );
};

export default ViewNotificationById;
