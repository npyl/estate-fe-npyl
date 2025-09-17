import { FC, PropsWithChildren } from "react";
import AdminGuard from "./admin-guard";
import Guard from "./_Guard";
import { IUser } from "@/types/user";

const allowCb = (u: IUser | null, isAuthenticated: boolean) => {
    // INFO: false-positive; we should offload this to the <AuthGuard />
    if (!isAuthenticated) return true;
    return Boolean(u?.messagingEnabled);
};

const MessagesGuard: FC<PropsWithChildren> = ({ children }) => (
    <AdminGuard>
        <Guard allowCb={allowCb}>{children}</Guard>
    </AdminGuard>
);

export default MessagesGuard;
