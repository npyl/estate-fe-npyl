import PropertyNotification from "@/sections/PropertyNotification/index";
import { useRouter } from "next/router";

const NotificationTab = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    return <PropertyNotification propertyId={propertyId} />;
};

export default NotificationTab;
