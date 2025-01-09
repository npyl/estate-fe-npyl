import type { FC, ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import { useLazyIsAdminQuery } from "src/services/user";
import { AuthGuard } from "./auth-guard";

interface AdminGuardProps {
    children: ReactNode;
}

export const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    const [checkIsAdmin] = useLazyIsAdminQuery();

    const [checked, setChecked] = useState(false);

    useLayoutEffect(() => {
        const check = async () => {
            try {
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
    }, [user?.id]);

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <AuthGuard>{children}</AuthGuard>;
};
