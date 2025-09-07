import useDialog from "@/hooks/useDialog";
import { useAuth } from "@/sections/use-auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";

const ERROR_401_HREF = "/401";

interface GuardProps extends PropsWithChildren {
    allowCb: (user: IUser | null, isAuthenticated: boolean) => boolean;

    redirectHref?: string;
}

const Guard: FC<GuardProps> = ({
    children,
    allowCb,
    // ...
    redirectHref = ERROR_401_HREF,
}) => {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (allowCb(user, isAuthenticated)) allow();
        else router.push(redirectHref);
    }, [allowCb, user, isAuthenticated]);

    if (!isAllowed) return null;

    return <>{children}</>;
};

export default Guard;
