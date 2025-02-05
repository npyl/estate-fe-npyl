import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const getTab = (userId: number): ITab => ({
    path: `/user/${userId}`,
    renderer: "USER",
    resourceId: userId,
});

const UserPusher = () => {
    const router = useRouter();
    const { userId } = router.query;
    return <Pusher tab={getTab(+userId!)} />;
};

export default UserPusher;
