import { FC, PropsWithChildren } from "react";
import Guard from "./_Guard";
import { IUser } from "@/types/user";

const allowCb = (u: IUser | null, isAuthenticated: boolean) => {
    // INFO: false-positive; we should offload this to the <AuthGuard />
    if (!isAuthenticated) return true;
    return u?.tasksEnabled === "ALL" || u?.tasksEnabled === "OWN";
};

const TasksGuard: FC<PropsWithChildren> = ({ children }) => (
    <Guard allowCb={allowCb}>{children}</Guard>
);

export default TasksGuard;
