import { FC } from "react";
import Popover from "@mui/material/Popover";
import { MoreAvatarsProps } from "@/components/Avatar/Group/types";
import AvatarGroup from "@/components/Avatar/Group";

const ShowAll: FC<MoreAvatarsProps> = ({ anchorEl, users, onClose }) => (
    <Popover open anchorEl={anchorEl} onClose={onClose}>
        <AvatarGroup max={users.length} users={users} />
    </Popover>
);

export default ShowAll;
