import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const TAB: ITab = {
    path: `/customer/create`,
    renderer: "CUSTOMER_CREATE",
};

const CustomerPusher = () => <Pusher tab={TAB} />;

export default CustomerPusher;
