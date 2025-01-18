import AvatarGroup from "@/components/Avatar/Group";
import { useAllUsersQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import { FC, useMemo } from "react";
import { CONVERSATION_IMAGE_WIDTH } from "./constants";
import { SxProps, Theme } from "@mui/material";

const VerticalAvatarGroupSx: SxProps<Theme> = {
    width: CONVERSATION_IMAGE_WIDTH,

    "&.MuiAvatarGroup-root": {
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        "& .MuiAvatar-root": {
            marginLeft: 3,
            marginBottom: -3,

            "&:last-child": {
                marginLeft: 0,
                marginBottom: 0,
            },
        },
    },
};

interface AvatarsProps {
    userIds: string[];
}

const Avatars: FC<AvatarsProps> = ({ userIds }) => {
    const { data, isLoading } = useAllUsersQuery();

    const filtered = useMemo(
        () => data?.filter(({ id }) => userIds.includes(id.toString())),
        [userIds, data]
    );

    if (isLoading) return <Skeleton variant="circular" />;

    return <AvatarGroup users={filtered} max={2} sx={VerticalAvatarGroupSx} />;
};

export default Avatars;
