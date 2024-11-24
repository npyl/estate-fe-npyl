import { IUserMini } from "@/types/user";

type TUser = Omit<IUserMini, "id"> & {
    id: any; // INFO: string or number, required
};

interface MoreAvatarsProps {
    users: TUser[];
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

export type { TUser, MoreAvatarsProps };
