import { useEffect } from "react";
import { useRouter } from "next/router";

// Handle in-app navigation
const useOnRouteChange = (cb: (url: string) => void) => {
    const path = useRouter().asPath;

    useEffect(() => {
        cb(path);
    }, [cb, path]);
};

export default useOnRouteChange;
