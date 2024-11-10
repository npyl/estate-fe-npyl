/**
 * This component makes sence only if the user is a Google Workspace admin!
 */

import { useAuth } from "@/hooks/use-auth";
import { useGetUsersQuery, useIsAdminQuery } from "@/services/calendar";
import { useFiltersContext } from "./context";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";

const Loader = () => <Skeleton width="100px" height="58px" />;

const AvatarSelectGroup = dynamic(
    () => import("@/components/AvatarSelectGroup"),
    {
        loading: Loader,
    }
);

const useIsOfficeAdmin = () => {
    const { user } = useAuth();
    const { data, isLoading } = useIsAdminQuery(user?.id!, {
        skip: user?.id === undefined,
    });

    return {
        // ... (google workspace)
        isAdmin: data?.isAdmin,
        admin: data?.user,
        isChecking: isLoading,
        // ... (property pro)
        userId: user?.id,
    };
};

const UserSelect = () => {
    const { isAdmin, admin, isChecking, userId } = useIsOfficeAdmin();

    const { data: officeUsers, isLoading } = useGetUsersQuery(userId!, {
        skip: !isAdmin,
    });

    const { user, setUser } = useFiltersContext();

    // Loading
    if (isChecking || isLoading) return <Loader />;

    // Not-admin
    if (!isAdmin) return null;

    const defaultValue = admin?.id;

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
