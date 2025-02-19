import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import AuthGuard from "./auth-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    const isAdmin = user?.isAdmin;

    useLayoutEffect(() => {
        if (!user?.notificationsEnabled && !isAdmin) {
            router.push("/401");
        }
    }, [user?.notificationsEnabled, isAdmin]);

    return <>{children}</>;
};

const NotificationsGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default NotificationsGuard;
