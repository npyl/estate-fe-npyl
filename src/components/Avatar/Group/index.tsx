import MuiAvatarGroup, {
    AvatarGroupProps as MuiAvatarGroupProps,
} from "@mui/material/AvatarGroup";
import { ComponentType, FC } from "react";
import { TUser } from "../types";
import { MoreAvatarsProps } from "./types";
import dynamic from "next/dynamic";
import TooltipAvatar from "./TooltipAvatar";
const Surplus = dynamic(() => import("./Surplus"));

// -------------------------------------------------------------------

const getSurplus =
    (users: TUser[], MoreAvatars?: ComponentType<MoreAvatarsProps>) =>
    (surplus: number) => {
        const end = users.length;
        const surplusUsers = users.slice(-1 * surplus, end);

        return (
            <Surplus
                users={surplusUsers}
                surplus={surplus}
                MoreAvatars={MoreAvatars}
            />
        );
    };

// -------------------------------------------------------------------

const getAvatar =
    (value?: TUser["id"], onChange?: (id: TUser["id"]) => void) => (u: TUser) =>
        (
            <TooltipAvatar
                key={u.id}
                u={u}
                selected={u.id === value}
                onClick={onChange}
            />
        );

export interface AvatarGroupProps<T extends TUser = TUser>
    extends Omit<MuiAvatarGroupProps, "renderSurplus"> {
    users?: T[];
    MoreAvatars?: ComponentType<MoreAvatarsProps>;

    value?: T["id"];
    onChange?: (id: T["id"]) => void;
}

const AvatarGroup: FC<AvatarGroupProps> = ({
    users = [],
    MoreAvatars,
    value,
    onChange,
    ...props
}) => (
    <MuiAvatarGroup {...props} renderSurplus={getSurplus(users, MoreAvatars)}>
        {users.map(getAvatar(value, onChange))}
    </MuiAvatarGroup>
);

export default AvatarGroup;
