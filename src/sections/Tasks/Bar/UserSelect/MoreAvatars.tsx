import Popover from "@mui/material/Popover";
import { FC } from "react";
import { MoreAvatarsProps } from "@/components/AvatarSelectGroup/types";
import { useFiltersContext } from "@/sections/Tasks/filters";
import AvatarSelectGroup from "@/components/AvatarSelectGroup";

const MoreAvatars: FC<MoreAvatarsProps> = ({ users, anchorEl, onClose }) => {
    const { assigneeId, setAssigneeId } = useFiltersContext();

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
