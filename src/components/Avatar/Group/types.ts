import { TUser } from "../types";

interface MoreAvatarsProps {
    users: TUser[];
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

export type { MoreAvatarsProps };
