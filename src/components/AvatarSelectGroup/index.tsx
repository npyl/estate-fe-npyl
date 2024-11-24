/**
 * AvatarGroup with select capability
 */

import AvatarGroup, { AvatarGroupProps } from "@mui/material/AvatarGroup";
import { ComponentType, FC } from "react";
import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { MoreAvatarsProps, TUser } from "./types";
import TooltipAvatar from "./TooltipAvatar";
const Surplus = dynamic(() => import("./Surplus"));

// -------------------------------------------------------------------

const getAvatar =
    <T extends TUser = TUser>(
        clickedId: T["id"] | undefined,
        onClick: (id: T["id"]) => void
    ) =>
    (u: T) =>
        (
            <TooltipAvatar
                key={u.id}
                u={u}
                selected={u.id === clickedId}
                onClick={onClick}
            />
        );

// -------------------------------------------------------------------

const getSurplus =
    (users: TUser[], MoreAvatars?: ComponentType<MoreAvatarsProps>) =>
    (surplus: number) => {
        const end = users.length - 1;
        const surplusUsers = users.slice(-1 * (surplus - 1), end);

        return (
            <Surplus
                users={surplusUsers}
                surplus={surplus}
                MoreAvatars={MoreAvatars}
            />
        );
    };

// -------------------------------------------------------------------

interface AvatarSelectGroupProps<T extends TUser = TUser>
    extends Omit<AvatarGroupProps, "value" | "onChange" | "renderSurplus"> {
    users?: T[];
    value?: T["id"];
    onChange: (v: T["id"]) => void;

    MoreAvatars?: ComponentType<MoreAvatarsProps>;
}

const AvatarSelectGroup: FC<AvatarSelectGroupProps> = ({
    users = [],
    value,
    onChange,
    MoreAvatars,
    children,
    ...props
}) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <AvatarGroup {...props} renderSurplus={getSurplus(users, MoreAvatars)}>
            {users.map(getAvatar(value, onChange))}
        </AvatarGroup>

        {/* INFO: make sure children are not accounted for in `props.max` */}
        {children}
    </Stack>
);

export default AvatarSelectGroup;
