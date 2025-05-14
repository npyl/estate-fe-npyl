import { useFiltersContext } from "../context";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import AllButton from "./AllButton";
import ClearButton from "./ClearButton";
import UserPicker from "@/sections/_Pickers/UserPicker";

/**
 * UserSelect makes sence only if the user is a Google Workspace admin!
 */
const UserSelect = () => {
    const { gwUser } = useIsOfficeAdmin();

    const { calendarId, setCalendarId } = useFiltersContext();

    // INFO: by-default we show the current user's calendar. Optionally, an admin can select to see all calendars!
    const value = calendarId || gwUser?.id;

    // Admin-only
    return (
        <UserPicker value={value} max={6} onChange={setCalendarId}>
            <AllButton />
            {calendarId && calendarId !== gwUser?.id ? <ClearButton /> : null}
        </UserPicker>
    );
};

export default UserSelect;
