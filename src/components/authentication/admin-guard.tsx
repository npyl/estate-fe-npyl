import type { FC, PropsWithChildren } from "react";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/sections/use-auth";
import AuthGuard from "./auth-guard";
import useDialog from "@/hooks/useDialog";

const ADMIN_GUARD_TESTID = "admin-guard-testid";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();
    const isAdmin = user?.isAdmin;

    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (isAdmin) allow();
        else router.push("/401");
    }, [isAdmin]);

    if (!isAllowed) return null;

    return (
        <>
            {/* INFO: if this div is found it means admin content is authorized */}
            <div data-testid={ADMIN_GUARD_TESTID} />
            {children}
        </>
    );
};

const AdminGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export { ADMIN_GUARD_TESTID };
export default AdminGuard;
