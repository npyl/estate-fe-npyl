import { useCallback, useRef } from "react";
import { ITab } from "@/types/tabs";
import useResourceId from "./useResourceId";
import useOnRouteChange from "./useOnRouteChange";
import useRenderer from "./useRenderer";
import { useRouter } from "next/router";
import { isSameTabOrg } from "../useTabState";

const useTabPusher = (
    pushTabCb: (t: ITab) => void,
    setTabPath: (p: string, newP: string) => void
) => {
    const resourceId = useResourceId();
    const renderer = useRenderer(Boolean(resourceId));

    const _initialPath = useRouter().asPath;
    const oldPath = useRef(_initialPath);

    const onRouteChange = useCallback(
        (path: string) => {
            const isParamChangeOnly = isSameTabOrg(oldPath.current, path);

            if (isParamChangeOnly) {
                setTabPath(oldPath.current, path);
            } else if (renderer) {
                pushTabCb({
                    path,
                    renderer,
                    resourceId,
                });
            } else {
                // do nothing ...
            }

            oldPath.current = path;
        },
        [resourceId, renderer, pushTabCb]
    );

    useOnRouteChange(onRouteChange);
};

export default useTabPusher;
