/**
 * Avatar
 * (This avatar supports a good failsafe logic: src -> initials -> icon)
 *
 * If `src` is passed; initials are ignored; otherwise `initials` are shown
 * If `initials` are falsy, a fallback mui profile icon is shown
 */

import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { forwardRef } from "react";

interface AvatarProps extends MuiAvatarProps {
    firstName?: string;
    lastName?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ firstName, lastName, src, ...props }, ref) => {
        const initials = (firstName?.[0] || "") + (lastName?.[0] || "");
        return (
            <MuiAvatar ref={ref} src={src} {...props}>
                {initials}
            </MuiAvatar>
        );
    }
);

Avatar.displayName = "Avatar";

export type { AvatarProps };
export default Avatar;
