import { useAuth } from "@/hooks/use-auth";
import { FC, PropsWithChildren } from "react";

const NotificationsGuard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();

    if (!user?.notificationsEnabled) return null;

    return <>{children}</>;
};

export default NotificationsGuard;
