import { FC, PropsWithChildren } from "react";
import AuthGuard from "./auth-guard";
import Guard from "./_Guard";
import { IUser } from "@/types/user";

const allowCb = (u: IUser | null) => Boolean(u?.notificationsEnabled);

const NotificationsGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard allowCb={allowCb}>{children}</Guard>
    </AuthGuard>
);

export default NotificationsGuard;
