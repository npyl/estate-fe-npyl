import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { ContentProps } from "@/components/Map/types";
import Controls from "./Controls";
import dynamic from "next/dynamic";
const MainMarker = dynamic(() => import("./MainMarker"));

interface ContentRef {
    load: VoidFunction;
}

const Content = forwardRef<ContentRef, ContentProps>(
    (
        {
            geocoderRef,
            // ...
            onMainMarkerDrag,
            mainMarker,
            // ...
            center,
            // ..
            controls,
            // ...
            children,
        },
        ref
    ) => {
        const [isReady, setIsReady] = useState(false);

        const load = useCallback(() => setIsReady(true), []);
        useImperativeHandle(ref, () => ({ load }), []);

        if (!isReady) return null;

        return (
            <>
                <Controls {...controls} />

                {mainMarker ? (
                    <MainMarker
                        geocoderRef={geocoderRef}
                        center={center}
                        onMainMarkerDrag={onMainMarkerDrag}
                    />
                ) : null}

                {children}
            </>
        );
    }
);

export type { ContentRef };
export default Content;
