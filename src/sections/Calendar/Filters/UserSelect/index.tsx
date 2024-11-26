import { useFiltersContext } from "../context";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import AllButton from "./AllButton";
import ClearButton from "./ClearButton";
import { useAllUsersQuery } from "@/services/user";
import { useMemo } from "react";
import { IUser } from "@/types/user";
const MoreAvatars = dynamic(() => import("./MoreAvatars"));

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
const UserSelect = () => {
    const { gwIsAdmin, gwUser, isChecking } = useIsOfficeAdmin();

    const { officeUsers, isLoading } = useOfficeUsers(gwIsAdmin);

    const { calendarId, setCalendarId } = useFiltersContext();

    // Loading
    if (isChecking || isLoading) return <Loader />;

    // Not-admin
    if (!gwIsAdmin) return null;

    // INFO: by-default we show the current user's calendar. Optionally, an admin can select to see all calendars!
    const value = calendarId || gwUser?.id;

    // Admin-only
    return (
        <AvatarSelectGroup
            users={officeUsers}
            value={value}
            max={6}
            onChange={setCalendarId}
            MoreAvatars={MoreAvatars}
        >
            <AllButton />
            {calendarId && calendarId !== gwUser?.id ? <ClearButton /> : null}
        </AvatarSelectGroup>
    );
};

export default UserSelect;
