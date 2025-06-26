/**
 * AvatarGroup with select capability
 */

import AvatarGroup, { AvatarGroupProps } from "@/components/Avatar/Group";
import { FC } from "react";
import { Stack } from "@mui/material";
import { TUser } from "./types";

// -------------------------------------------------------------------

interface AvatarSelectGroupProps<T extends TUser = TUser>
    extends Omit<AvatarGroupProps<T>, "value" | "onChange"> {
    value: T["id"];
    onChange: (v: T["id"]) => void;
}

const AvatarSelectGroup: FC<AvatarSelectGroupProps> = ({
    users = [],
    value,
    onChange,
    children,
    ...props
}) => (
    <Stack direction="row" alignItems="center">
        <AvatarGroup
            users={users}
            value={value}
            onChange={onChange}
            {...props}
        />

        {/* INFO: make sure children are not accounted for in `props.max` */}
        {children}
    </Stack>
);

export type { AvatarSelectGroupProps };
export default AvatarSelectGroup;
