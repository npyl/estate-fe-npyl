import { useAuth } from "@/hooks/use-auth";
import { FC, PropsWithChildren } from "react";

// TODO: i should be checking with AuthGuard aswell but all these are going to be server side eventually, so...

const NotificationsGuard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();

    if (!user?.notificationsEnabled) return null;

    return <>{children}</>;
};

export default NotificationsGuard;
