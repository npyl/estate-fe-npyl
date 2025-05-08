import { FC, PropsWithChildren } from "react";
import { useIsGoogleWorkspaceIntegratedQuery } from "@/services/company";
import { useIsAuthenticatedQuery } from "@/services/google-oauth";
import { useAuth } from "@/hooks/use-auth";

const IsAuthenticatedGuard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();

    // Workspace
    const { data: data0 } = useIsGoogleWorkspaceIntegratedQuery();
    if (!data0?.isIntegrated) return null;

    // Authenticated
    const { data: data1 } = useIsAuthenticatedQuery(user?.id!, {
        skip: !user?.id,
    });
    if (!data1?.isAuthenticated) return null;

    return children;
};

export default IsAuthenticatedGuard;
