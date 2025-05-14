import Popover from "@mui/material/Popover";
import { FC } from "react";
import { MoreAvatarsProps } from "@/components/Avatar/Group/types";
import AvatarSelectGroup from "@/components/Avatar/SelectGroup";

const MoreAvatars: FC<MoreAvatarsProps> = ({
    value,
    onChange,
    // ...
    users,
    anchorEl,
    onClose,
}) => (
    <Popover open anchorEl={anchorEl} onClose={onClose}>
        <AvatarSelectGroup
            users={users}
            max={users.length}
            // ...
            value={value}
            onChange={(v) => onChange?.(v)}
        />
    </Popover>
);

export default MoreAvatars;
