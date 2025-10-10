import { forwardRef, useCallback, useImperativeHandle } from "react";

interface WatchAndClickRef {
    watchAndClick: (eventId: string) => void;
}

const WatchAndClick = forwardRef<WatchAndClickRef, any>((props, ref) => {
    const watchAndClick = useCallback(() => {}, []);

    useImperativeHandle(ref, () => ({ watchAndClick }), []);

    return null;
});

export type { WatchAndClickRef };
export default WatchAndClick;
