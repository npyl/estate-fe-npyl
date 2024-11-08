import { FC } from "react";
import Avatar from "@/components/Avatar";
import { useGetUserQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";

// ----------------------------------------------------

interface CreatorAvatarProps {
    creatorId: number;
}

const CreatorAvatar: FC<CreatorAvatarProps> = ({ creatorId }) => {
    const { data, isLoading } = useGetUserQuery(creatorId, {
        skip: creatorId === -1,
    });

    if (isLoading) return <Skeleton width={64} height={64} />;

    return (
        <Avatar
            src={data?.avatar}
            firstName={data?.firstName}
            lastName={data?.lastName}
        />
    );
};

export default CreatorAvatar;
