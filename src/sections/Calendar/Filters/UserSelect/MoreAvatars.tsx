import Popover from "@mui/material/Popover";
import { FC } from "react";
import { MoreAvatarsProps } from "@/components/Avatar/Group/types";
import { useFiltersContext } from "@/sections/Calendar/Filters/context";
import AvatarSelectGroup from "@/components/Avatar/SelectGroup";

const MoreAvatars: FC<MoreAvatarsProps> = ({ users, anchorEl, onClose }) => {
    const { calendarId, setCalendarId } = useFiltersContext();

    return (
        <Popover open anchorEl={anchorEl} onClose={onClose}>
            <AvatarSelectGroup
                users={users}
                max={users.length}
                // ...
                value={calendarId}
                onChange={setCalendarId}
            />
        </Popover>
    );
};

export default MoreAvatars;
