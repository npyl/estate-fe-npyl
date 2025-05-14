import MuiAvatarGroup, {
    AvatarGroupProps as MuiAvatarGroupProps,
} from "@mui/material/AvatarGroup";
import { ComponentType, FC, useMemo } from "react";
import { TUser } from "../types";
import { MoreAvatarsProps } from "./types";
import dynamic from "next/dynamic";
import TooltipAvatar from "./TooltipAvatar";
const Surplus = dynamic(() => import("./Surplus"));

// -------------------------------------------------------------------

const getSurplus =
    (
        value: TUser["id"] | undefined,
        onChange: ((id: TUser["id"]) => void) | undefined,
        // ...
        users: TUser[],
        MoreAvatars?: ComponentType<MoreAvatarsProps>
    ) =>
    (surplus: number) => {
        const surplusUsers = users.filter(({ id }) => id !== value);

        return (
            <Surplus
                value={value}
                onChange={onChange}
                // ...
                users={surplusUsers}
                surplus={surplus}
                MoreAvatars={MoreAvatars}
            />
        );
    };

// -------------------------------------------------------------------

const getAvatar =
    (value?: TUser["id"], onChange?: (id: TUser["id"]) => void) =>
    (u: TUser) => (
        <TooltipAvatar
            key={u.id}
            u={u}
            selected={u.id === value}
            onClick={onChange}
        />
    );

// -------------------------------------------------------------------

const useSelectedFirst = <T extends TUser = TUser>(
    value: T["id"],
    users: T[]
) =>
    useMemo(() => {
        if (!users || users.length === 0) return [];
        if (!value) return users;

        const selectedUser = users.find((user) => user.id === value);
        if (!selectedUser) return users;

        const otherUsers = users.filter((user) => user.id !== value);
        return [selectedUser, ...otherUsers];
    }, [users, value]);

// -------------------------------------------------------------------

interface AvatarGroupProps<T extends TUser = TUser>
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
}) => {
    const rearranged = useSelectedFirst(value, users);

    return (
        <MuiAvatarGroup
            {...props}
            renderSurplus={getSurplus(value, onChange, users, MoreAvatars)}
        >
            {rearranged.map(getAvatar(value, onChange))}
        </MuiAvatarGroup>
    );
};

export type { AvatarGroupProps };
export default AvatarGroup;
