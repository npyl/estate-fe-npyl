import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

// Handle in-app navigation
const useOnRouteChange = (cb: (url: string) => void) => {
    const router = useRouter();
    const pathname = usePathname();

    useLayoutEffect(() => {
        // TODO: pathname doesn't account for searchParams
        cb(pathname);
    }, []);

    useLayoutEffect(() => {
        router.events.on("routeChangeComplete", cb);
        return () => {
            router.events.off("routeChangeComplete", cb);
        };
    }, [cb]);
};

export default useOnRouteChange;
