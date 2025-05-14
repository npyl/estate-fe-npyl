import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import { useAllUsersQuery } from "@/services/user";
import { forwardRef, useMemo } from "react";
import { IUser } from "@/types/user";
import { AvatarSelectGroupProps } from "@/components/Avatar/SelectGroup";
const MoreAvatars = dynamic(
    () => import("@/sections/_Pickers/UserPicker/MoreAvatars")
);

const Loader = () => <Skeleton width="100px" height="58px" />;

const AvatarSelectGroup = dynamic(
    () => import("@/components/Avatar/SelectGroup"),
    {
        loading: Loader,
    }
);

/**
 * Select all pp-users that have google workspace email assigned to them
 */
export const useOfficeUsers = (gwIsAdmin: boolean = false) => {
    const { data, isLoading } = useAllUsersQuery(undefined, {
        skip: !gwIsAdmin,
    });

    const officeUsers = useMemo(() => {
        if (!data?.length) return [];

        return data.reduce<IUser[]>((acc, user) => {
            if (!user.workspaceEmail) {
                return acc;
            }

            acc.push({
                ...user,
                id: user.workspaceEmail as any,
            });

            return acc;
        }, []);
    }, [data]);

    return { officeUsers, isLoading };
};

/**
 * UserSelect makes sence only if the user is a Google Workspace admin!
 */

interface UserPickerProps extends Omit<AvatarSelectGroupProps, "MoreAvatars"> {}

const UserPicker = forwardRef<HTMLDivElement, UserPickerProps>(
    ({ value: _value, ...props }, ref) => {
        const { gwIsAdmin, gwUser, isChecking } = useIsOfficeAdmin();

        const { officeUsers, isLoading } = useOfficeUsers(gwIsAdmin);

        // Loading
        if (isChecking || isLoading) return <Loader />;

        // Not-admin
        if (!gwIsAdmin) return null;

        // INFO: by-default we show the current user's calendar. Optionally, an admin can select to see all calendars!
        const value = _value ?? gwUser?.id;

        // Admin-only
        return (
            <AvatarSelectGroup
                ref={ref}
                users={officeUsers}
                value={value}
                max={6}
                MoreAvatars={MoreAvatars}
                {...props}
            />
        );
    }
);

UserPicker.displayName = "UserPicker";

export default UserPicker;
