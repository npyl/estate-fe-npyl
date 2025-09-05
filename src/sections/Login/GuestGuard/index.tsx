import type { FC, PropsWithChildren } from "react";
import IsReady from "@/components/authentication/_IsReady";
import Guard from "@/components/authentication/_Guard";

// INFO: allow login (if not authenticated)
const allowCb = (_: any, isAuthenticated: boolean) => !isAuthenticated;

const GuestGuard: FC<PropsWithChildren> = ({ children }) => (
    <IsReady>
        <Guard allowCb={allowCb} redirectHref="/">
            {children}
        </Guard>
    </IsReady>
);

export default GuestGuard;
