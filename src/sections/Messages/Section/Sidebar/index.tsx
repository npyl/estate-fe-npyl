import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";
import Stack from "@mui/material/Stack";
import SidebarSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
const UserOption = dynamic(() => import("./UserOption"));

// ----------------------------------------------------------------------

const getUserOption = (u: IUser) => <UserOption key={u.id} u={u} />;

// ----------------------------------------------------------------------

const MessageSidebar = () => {
    const { data: users, isLoading } = useAllUsersQuery();
    return (
        <Stack height={1} overflow="hidden auto">
            {isLoading ? <SidebarSkeleton /> : null}
            {users?.map(getUserOption)}
        </Stack>
    );
};

export default MessageSidebar;
