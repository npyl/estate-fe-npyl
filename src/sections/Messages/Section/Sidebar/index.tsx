import Avatar from "@/components/Avatar";
import { useAllUsersQuery } from "@/services/user";
import { getBorderColor2 } from "@/theme/borderColor";
import { IUser } from "@/types/user";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import SidebarSkeleton from "./Skeleton";
import { SxProps, Theme } from "@mui/material";
import StatusIndicator from "./StatusIndicator";

// ----------------------------------------------------------------------

const UserOptionSx: SxProps<Theme> = {
    alignItems: "center",

    p: 1,

    borderBottom: "1px solid",
    borderColor: getBorderColor2,

    "&:hover": {
        bgcolor: "neutral.200",
        cursor: "pointer",
    },

    "&:last-child": {
        border: "none",
    },
};

interface UserOptionProps {
    u: IUser;
    onClick: VoidFunction;
}

const UserOption: FC<UserOptionProps> = ({ u, onClick }) => {
    const { avatar, firstName, lastName } = u || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;
    return (
        <Stack direction="row" spacing={1} sx={UserOptionSx} onClick={onClick}>
            <Avatar src={avatar} firstName={firstName} lastName={lastName} />
            <Stack width="100%">
                <Typography variant="body2" fontWeight="bold">
                    {fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Το τελευταίο που έγραψε!
                </Typography>
            </Stack>
            <Stack width="10%" height={1}>
                <Typography
                    variant="body2"
                    fontWeight="300"
                    color="text.secondary"
                >
                    Date
                </Typography>
                <StatusIndicator />
            </Stack>
        </Stack>
    );
};

// ----------------------------------------------------------------------

const getUserOption = (onUserSelect: (id: number) => void) => (u: IUser) =>
    <UserOption key={u.id} u={u} onClick={() => onUserSelect(u.id)} />;

// ----------------------------------------------------------------------

interface MessageSidebarProps {
    onUserSelect: (id: number) => void;
}

const MessageSidebar: FC<MessageSidebarProps> = ({ onUserSelect }) => {
    const { data: users, isLoading } = useAllUsersQuery();
    return (
        <Stack height={1} overflow="hidden auto">
            {isLoading ? <SidebarSkeleton /> : null}
            {users?.map(getUserOption(onUserSelect))}
        </Stack>
    );
};

export default MessageSidebar;
