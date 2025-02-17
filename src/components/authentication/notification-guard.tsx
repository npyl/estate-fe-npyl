import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import AuthGuard from "./auth-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user?.notificationsEnabled) {
        router.push("/401");
        return null;
    }

    return <>{children}</>;
};

const NotificationsGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default NotificationsGuard;
