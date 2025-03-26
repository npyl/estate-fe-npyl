import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

// Handle in-app navigation
const useOnRouteChange = (cb: (url: string) => void) => {
    const path = useRouter().asPath;

    useLayoutEffect(() => {
        cb(path);
    }, [cb, path]);
};

export default useOnRouteChange;
