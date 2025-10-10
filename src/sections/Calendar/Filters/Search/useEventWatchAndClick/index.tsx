import { useCallback, useRef } from "react";
import WatchAndClick, { WatchAndClickRef } from "./WatchAndClick";

const useEventWatchAndClick = () => {
    const watchAndClickRef = useRef<WatchAndClickRef>(null);
    const onWaitEventAndClick = useCallback(
        (eventId: string) => watchAndClickRef.current?.watchAndClick(eventId),
        []
    );

    const EventWatcher = <WatchAndClick ref={watchAndClickRef} />;

    return { onWaitEventAndClick, EventWatcher };
};

export default useEventWatchAndClick;
