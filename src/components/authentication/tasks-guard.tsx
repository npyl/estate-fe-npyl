import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import AuthGuard from "./auth-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    const isAdmin = user?.isAdmin;

    useLayoutEffect(() => {
        if (
            (!user?.tasksEnabled || user?.tasksEnabled === "NONE") &&
            !isAdmin
        ) {
            router.push("/401");
        }
    }, [user?.tasksEnabled, isAdmin]);

    return <>{children}</>;
};

const TasksGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default TasksGuard;
