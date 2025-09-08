import { useCallback, useLayoutEffect } from "react";
import { useRouter } from "next/router";

// Handle browser refresh/close with default prompt
const useBeforeUnload = (cb: (e: BeforeUnloadEvent) => void) => {
    useLayoutEffect(() => {
        window.addEventListener("beforeunload", cb);
        return () => {
            window.removeEventListener("beforeunload", cb);
        };
    }, [cb]);
};

// Handle in-app navigation
const useOnRouteChange = (cb: (url: string) => void) => {
    const router = useRouter();

    useLayoutEffect(() => {
        router.events.on("routeChangeStart", cb);
        return () => {
            router.events.off("routeChangeStart", cb);
        };
    }, [cb]);
};

const useUnsavedChangesWatcher = (onExit: VoidFunction) => {
    const router = useRouter();

    const handleBeforeUnload = useCallback(() => {
        onExit();
        return "";
    }, [onExit]);

    const handleRouteChangeStart = useCallback(
        (url: string) => {
            // INFO: same page redirect
            if (url === router.asPath) return;
            onExit();
        },
        [router.asPath, onExit]
    );

    useBeforeUnload(handleBeforeUnload);
    useOnRouteChange(handleRouteChangeStart);
};

export default useUnsavedChangesWatcher;
