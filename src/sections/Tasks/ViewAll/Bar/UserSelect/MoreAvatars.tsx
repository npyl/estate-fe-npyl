import Popover from "@mui/material/Popover";
import { FC } from "react";
import { MoreAvatarsProps } from "@/components/Avatar/Group/types";
import { useFiltersContext } from "@/sections/Tasks/filters";
import AvatarSelectGroup from "@/components/Avatar/SelectGroup";

const MoreAvatars: FC<MoreAvatarsProps> = ({ users, anchorEl, onClose }) => {
    const { filters, setAssigneeId } = useFiltersContext();
    const { assigneeId } = filters || {};
    return (
        <Popover open anchorEl={anchorEl} onClose={onClose}>
            <AvatarSelectGroup
                users={users}
                max={users.length}
                // ...
                value={assigneeId}
                onChange={setAssigneeId}
            />
        </Popover>
    );
};

export default MoreAvatars;
