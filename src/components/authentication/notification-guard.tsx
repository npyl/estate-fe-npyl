import { useAuth } from "@/sections/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import AuthGuard from "./auth-guard";
import useDialog from "@/hooks/useDialog";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (!user?.notificationsEnabled) {
            router.push("/401");
        } else {
            allow();
        }
    }, [user?.notificationsEnabled]);

    if (!isAllowed) return null;

    return <>{children}</>;
};

const NotificationsGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default NotificationsGuard;
