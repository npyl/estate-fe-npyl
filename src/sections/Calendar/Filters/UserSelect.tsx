import { useGetUsersQuery } from "@/services/calendar";
import { useFiltersContext } from "./context";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";

const Loader = () => <Skeleton width="100px" height="58px" />;

const AvatarSelectGroup = dynamic(
    () => import("@/components/AvatarSelectGroup"),
    {
        loading: Loader,
    }
);

/**
 * UserSelect makes sence only if the user is a Google Workspace admin!
 */
const UserSelect = () => {
    const { gwIsAdmin, gwUser, isChecking, userId } = useIsOfficeAdmin();

    const { data: officeUsers, isLoading } = useGetUsersQuery(userId!, {
        skip: !gwIsAdmin,
    });

    const { user, setUser } = useFiltersContext();

    // Loading
    if (isChecking || isLoading) return <Loader />;

    // Not-admin
    if (!gwIsAdmin) return null;

    const defaultValue = gwUser?.id;

    // Admin-only
    return (
        <AvatarSelectGroup
            users={officeUsers}
            value={user || defaultValue}
            onChange={setUser as any}
        />
    );
};

export default UserSelect;
