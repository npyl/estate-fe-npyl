import { useCalendarAuth } from "@/services/calendar";
import { useMemo } from "react";

const EMPTY_CB = (() => {}) as any;

const useAuthenticatedClick = (cb: (args: any) => void) => {
    const { isAuthenticated } = useCalendarAuth();

    const onAuthenticatedClick = useMemo(
        () => (isAuthenticated ? cb : EMPTY_CB),
        [isAuthenticated, cb]
    );

    return { onAuthenticatedClick };
};

export default useAuthenticatedClick;
