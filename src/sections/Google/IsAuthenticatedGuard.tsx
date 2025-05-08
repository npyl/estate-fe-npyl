import { FC, PropsWithChildren } from "react";
import { useIsGoogleWorkspaceIntegratedQuery } from "@/services/company";
import { useIsAuthenticatedQuery } from "@/services/google-oauth";
import { useAuth } from "@/hooks/use-auth";

const IsAuthenticatedGuard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const isReady = Boolean(user?.id);

    // Workspace
    const { data: data0 } = useIsGoogleWorkspaceIntegratedQuery(undefined, {
        skip: !isReady,
    });
    const isIntegrated = data0?.isIntegrated;

    // Authenticated
    const { data: data1 } = useIsAuthenticatedQuery(user?.id!, {
        skip: !isIntegrated,
    });
    if (!data1?.isAuthenticated) return null;

    return children;
};

export default IsAuthenticatedGuard;
