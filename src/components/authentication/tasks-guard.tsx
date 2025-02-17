import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { AuthGuard } from "./auth-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user?.tasksEnabled || user?.tasksEnabled === "NONE") {
        router.push("/401");
        return null;
    }

    return <>{children}</>;
};

const TasksGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default TasksGuard;
