import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/use-auth";
import { useLazyIsAdminQuery } from "src/services/user";

interface AdminGuardProps {
    children: ReactNode;
}

export const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();

    const [checkIsAdmin] = useLazyIsAdminQuery();

    const [checked, setChecked] = useState(false);

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (!auth.isAuthenticated) {
                router
                    .push({
                        pathname: "/authentication/login",
                        query: { returnUrl: router.asPath },
                    })
                    .catch(console.error);
            } else {
                if (!auth.user?.id) {
                    console.error("user id null");
                    return;
                }

                checkIsAdmin(auth.user?.id)
                    .unwrap()
                    .then((isAdmin) => isAdmin && setChecked(true));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady, auth.isAuthenticated]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>;
};
