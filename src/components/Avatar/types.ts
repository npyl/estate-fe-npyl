import { IUserMini } from "@/types/user";

type TUser = Omit<IUserMini, "id"> & {
    id: any; // INFO: string or number, required
};

export type { TUser };
