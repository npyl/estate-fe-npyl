import type { FC, PropsWithChildren } from "react";
import IsReady from "@/components/authentication/_IsReady";
import Guard from "@/components/authentication/_Guard";
import { useSearchParams } from "next/navigation";

// INFO: allow login (if not authenticated)
const allowCb = (_: any, isAuthenticated: boolean) => !isAuthenticated;

const CustomGuard: FC<PropsWithChildren> = ({ children }) => {
    const p = useSearchParams();
    const returnUrl = p.get("returnUrl") ?? "/";
    return (
        <Guard allowCb={allowCb} redirectHref={returnUrl}>
            {children}
        </Guard>
    );
};

const GuestGuard: FC<PropsWithChildren> = ({ children }) => (
    <IsReady>
        <CustomGuard>{children}</CustomGuard>
    </IsReady>
);

export default GuestGuard;
