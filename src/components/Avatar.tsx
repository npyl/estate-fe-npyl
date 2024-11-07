/**
 * Avatar
 * (This avatar supports a good failsafe logic: src -> initials -> icon)
 *
 * If `src` is passed; initials are ignored; otherwise `initials` are shown
 * If `initials` are falsy, a fallback mui profile icon is shown
 */

import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { FC } from "react";

export interface AvatarProps extends MuiAvatarProps {
    firstName?: string;
    lastName?: string;
}

const Avatar: FC<AvatarProps> = ({ firstName, lastName, src, ...props }) => {
    const initials = (firstName?.[0] || "") + (lastName?.[0] || "");
    return (
        <MuiAvatar src={src} {...props}>
            {initials}
        </MuiAvatar>
    );
};

export default Avatar;
