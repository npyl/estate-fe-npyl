import { useAuth } from "@/sections/use-auth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import AuthGuard from "./auth-guard";

const Guard: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    const isAdmin = user?.isAdmin;

    useLayoutEffect(() => {
        if (!user?.agreementsEnabled && !isAdmin) {
            router.push("/401");
        }
    }, [user?.agreementsEnabled, isAdmin]);

    return <>{children}</>;
};

const AgreementsGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard>{children}</Guard>
    </AuthGuard>
);

export default AgreementsGuard;
