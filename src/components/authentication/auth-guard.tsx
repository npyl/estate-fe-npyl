import type { FC, PropsWithChildren } from "react";
import IsReady from "./_IsReady";
import Guard from "./_Guard";

const allowCb = (_: any, isAuthenticated: boolean) => isAuthenticated;

interface AuthGuardProps extends PropsWithChildren {}

const Wrapped: FC<AuthGuardProps> = ({ children }) => (
    <IsReady>
        <Guard
            allowCb={allowCb}
            // ...
            redirectHref="/login"
            redirectWithQuery
        >
            {children}
        </Guard>
    </IsReady>
);

export default Wrapped;
