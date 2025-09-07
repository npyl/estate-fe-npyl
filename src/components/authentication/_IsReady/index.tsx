import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

const IsReady: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    if (!router.isReady) return null;
    return children;
};

export default IsReady;
