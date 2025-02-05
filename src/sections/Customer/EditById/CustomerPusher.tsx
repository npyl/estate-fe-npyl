import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const getTab = (customerId: number): ITab => ({
    path: `/customer/edit/${customerId}`,
    renderer: "CUSTOMER_EDIT",
    resourceId: customerId,
});

const CustomerPusher = () => {
    const router = useRouter();
    const { customerId } = router.query;
    return <Pusher tab={getTab(+customerId!)} />;
};

export default CustomerPusher;
