import type { FC, PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/sections/use-auth";
import IsReady from "./IsReady";

interface GuestGuardProps extends PropsWithChildren {}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useLayoutEffect(() => {
        // You should remove the "disableGuard" check, because it's meant to be used only in the demo.
        if (auth.isAuthenticated) {
            router.push("/");
        } else {
            setChecked(true);
        }
    }, [auth.isAuthenticated]);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
};

const Wrapped: FC<GuestGuardProps> = (props) => (
    <IsReady>
        <GuestGuard {...props} />
    </IsReady>
);

export default Wrapped;
