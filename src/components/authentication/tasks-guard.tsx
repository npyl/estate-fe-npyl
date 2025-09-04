import { FC, PropsWithChildren } from "react";
import AdminGuard from "./admin-guard";
import Guard from "./_Guard";
import { IUser } from "@/types/user";

const allowCb = (u: IUser | null) =>
    u?.tasksEnabled === "ALL" || u?.tasksEnabled === "OWN";

const TasksGuard: FC<PropsWithChildren> = ({ children }) => (
    <AdminGuard>
        <Guard allowCb={allowCb}>{children}</Guard>
    </AdminGuard>
);

export default TasksGuard;
