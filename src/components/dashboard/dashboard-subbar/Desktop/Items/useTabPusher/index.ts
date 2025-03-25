import { useCallback } from "react";
import { ITab } from "@/types/tabs";
import useResourceId from "./useResourceId";
import useOnRouteChange from "./useOnRouteChange";
import useRenderer from "./useRenderer";

const useTabPusher = (pushTabCb: (t: ITab) => void) => {
    const resourceId = useResourceId();
    const renderer = useRenderer(Boolean(resourceId));

    const onRouteChange = useCallback(
        (path: string) => {
            if (!renderer) return;

            // TODO: see if we have a change *ONLY* in the query params!

            pushTabCb({
                path,
                renderer,
                resourceId,
            });
        },
        [resourceId, renderer, pushTabCb]
    );

    useOnRouteChange(onRouteChange);
};

export default useTabPusher;
