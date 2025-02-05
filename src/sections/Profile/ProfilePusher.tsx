import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const TAB: ITab = {
    path: `/profile`,
    renderer: "PROFILE",
    resourceId: -1,
};

const ProfilePusher = () => <Pusher tab={TAB} />;

export default ProfilePusher;
