import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";
import { FC } from "react";
import { useGetUserQuery } from "@/services/user";

interface LabelProps {
    userId: number;
}

const Label: FC<LabelProps> = ({ userId }) => {
    const { data } = useGetUserQuery(+userId!);
    const { firstName, lastName } = data || {};
    return `${firstName || ""} ${lastName || ""}`;
};

const getTab = (userId: number): ITab => ({
    path: `/user/${userId}`,
    label: <Label userId={userId} />,
});

const UserPusher = () => {
    const router = useRouter();
    const { userId } = router.query;
    return <Pusher tab={getTab(+userId!)} />;
};

export default UserPusher;
