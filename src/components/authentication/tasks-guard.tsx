import { useAuth } from "@/sections/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";
import AdminGuard from "./admin-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (!user?.tasksEnabled || user?.tasksEnabled === "NONE") {
            router.push("/401");
        } else {
            allow();
        }
    }, [user?.tasksEnabled]);

    if (!isAllowed) return null;

    return <>{children}</>;
};

const TasksGuard: FC<PropsWithChildren> = ({ children }) => (
    <AdminGuard>
        <Guard>{children}</Guard>
    </AdminGuard>
);

export default TasksGuard;
