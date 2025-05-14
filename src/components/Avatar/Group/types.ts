import { TUser } from "../types";

interface MoreAvatarsProps {
    users: TUser[];
    anchorEl: HTMLElement;
    onClose: VoidFunction;

    value?: TUser["id"];
    onChange?: (id: TUser["id"]) => void;
}

export type { MoreAvatarsProps };
