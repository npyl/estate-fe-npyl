import useDialog from "@/hooks/useDialog";
import { useAuth } from "@/sections/use-auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";

const ERROR_401_HREF = "/401";

const getPushData = (
    redirectWithQuery: boolean,
    redirectHref: string,
    returnUrl: string
) =>
    redirectWithQuery
        ? {
              pathname: redirectHref,
              query: { returnUrl },
          }
        : redirectHref;

interface GuardProps extends PropsWithChildren {
    allowCb: (user: IUser, isAuthenticated: boolean) => boolean;

    redirectHref?: string;
    redirectWithQuery?: boolean;
}

const Guard: FC<GuardProps> = ({
    children,
    allowCb,
    // ...
    redirectHref = ERROR_401_HREF,
    redirectWithQuery = false,
}) => {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const [isAllowed, allow] = useDialog();

    useLayoutEffect(() => {
        if (!user) return;
        if (allowCb(user, isAuthenticated)) allow();
        else
            router.push(
                getPushData(redirectWithQuery, redirectHref, router.asPath)
            );
    }, [allowCb, user, isAuthenticated]);

    if (!isAllowed) return null;

    return <>{children}</>;
};

export default Guard;
