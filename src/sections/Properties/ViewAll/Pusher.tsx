import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const TAB: ITab = {
    path: `/property`,
    renderer: "PROPERTIES",
    resourceId: -1,
};

const AllPropertiesPusher = () => <Pusher tab={TAB} />;

export default AllPropertiesPusher;
