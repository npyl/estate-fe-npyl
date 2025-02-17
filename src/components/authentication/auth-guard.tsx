import type { FC, PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useLayoutEffect(
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
                setChecked(true);
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

export default AuthGuard;
