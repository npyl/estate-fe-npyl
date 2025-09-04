import type { FC, PropsWithChildren } from "react";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/sections/use-auth";
import IsReady from "./_IsReady";
import useDialog from "@/hooks/useDialog";

interface AuthGuardProps extends PropsWithChildren {}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();
    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (!auth.isAuthenticated) {
            router.push({
                pathname: "/login",
                query: { returnUrl: router.asPath },
            });
        } else {
            allow();
        }
    }, [auth.isAuthenticated]);

    if (!isAllowed) return null;

    return <>{children}</>;
};

const Wrapped: FC<AuthGuardProps> = (props) => (
    <IsReady>
        <AuthGuard {...props} />
    </IsReady>
);

export default Wrapped;
