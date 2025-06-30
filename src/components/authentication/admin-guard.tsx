import type { FC, PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import { useLazyIsAdminQuery } from "src/services/user";
import AuthGuard from "./auth-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    const [checkIsAdmin] = useLazyIsAdminQuery();

    const [checked, setChecked] = useState(false);

    useLayoutEffect(() => {
        const check = async () => {
            try {
                // INFO: we are going to just return here; either we lost authenticated status because of logout or we werent authenticated to begin with (which is AuthGuard's job to handle)
                if (!isAuthenticated) return;

                // Not logged in...
                if (!Boolean(user?.id)) throw new Error("Bad user");

                const isAdmin = await checkIsAdmin(user?.id!).unwrap();

                if (isAdmin) setChecked(true);

                // Not an admin; throw so we can redirect
                if (!isAdmin) throw new Error("Not an admin");
            } catch (ex) {
                router.push("/401");
            }
        };

        check();
    }, [isAuthenticated, user?.id]);

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>;
};

const AdminGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default AdminGuard;
