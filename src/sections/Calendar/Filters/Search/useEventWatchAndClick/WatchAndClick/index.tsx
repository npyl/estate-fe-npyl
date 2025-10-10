import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import Clicker from "./Clicker";

interface WatchAndClickRef {
    watchAndClick: (eventId: string) => void;
}

const WatchAndClick = forwardRef<WatchAndClickRef, any>((props, ref) => {
    const [eventId, setEventId] = useState<string>();
    const onClose = useCallback(() => setEventId(undefined), []);

    useImperativeHandle(ref, () => ({ watchAndClick: setEventId }), []);

    if (!eventId) return null;

    return <Clicker eventId={eventId} onClose={onClose} />;
});

export type { WatchAndClickRef };
export default WatchAndClick;
