import Avatar from "@/components/Avatar";
import { useGetUserQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";

interface SenderAvatarProps {
    userId: number;
}

const SenderAvatar: FC<SenderAvatarProps> = ({ userId }) => {
    const { data, isLoading } = useGetUserQuery(userId);
    const { avatar, firstName, lastName } = data || {};
    if (isLoading) return <Skeleton variant="circular" />;
    return (
        <Avatar
            className="pp-message-avatar"
            src={avatar}
            firstName={firstName}
            lastName={lastName}
        />
    );
};

export default SenderAvatar;
