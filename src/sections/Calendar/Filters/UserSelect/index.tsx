import { useGetUsersQuery } from "@/services/calendar";
import { useFiltersContext } from "../context";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import AllButton from "./AllButton";
import ClearButton from "./ClearButton";

const Loader = () => <Skeleton width="100px" height="58px" />;

const AvatarSelectGroup = dynamic(
    () => import("@/components/Avatar/SelectGroup"),
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
            onChange={setCalendarId}
        >
            <AllButton />
            {calendarId && calendarId !== gwUser?.id ? <ClearButton /> : null}
        </AvatarSelectGroup>
    );
};

export default UserSelect;
