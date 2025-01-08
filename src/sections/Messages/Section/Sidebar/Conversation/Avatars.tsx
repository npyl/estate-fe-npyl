import AvatarGroup from "@/components/Avatar/Group";
import { useAllUsersQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";

interface AvatarsProps {
    userIds: number[];
}

const Avatars: FC<AvatarsProps> = ({ userIds }) => {
    const { data, isLoading } = useAllUsersQuery();

    if (isLoading) return <Skeleton variant="circular" />;

    return <AvatarGroup users={data} max={3} />;
};

export default Avatars;
