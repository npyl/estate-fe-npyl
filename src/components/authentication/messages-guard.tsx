import { useAuth } from "@/sections/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import AdminGuard from "./admin-guard";
import useDialog from "@/hooks/useDialog";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (!user?.messagingEnabled) {
            router.push("/401");
        } else {
            allow();
        }
    }, [user?.messagingEnabled]);

    if (!isAllowed) return null;

    return <>{children}</>;
};

const MessagesGuard: FC<PropsWithChildren> = ({ children }) => (
    <AdminGuard>
        <Guard>{children}</Guard>
    </AdminGuard>
);

export default MessagesGuard;
