import { useCallback, useRef } from "react";
import { ITab } from "@/types/tabs";
import useResourceId from "./useResourceId";
import useOnRouteChange from "./useOnRouteChange";
import useRenderer from "./useRenderer";
import { useRouter } from "next/router";
import { isSameTabOrg } from "../useTabState";

const SHOULD_UPDATE_DATA = false;

const useTabPusher = (
    pushTabCb: (t: ITab, ud?: boolean) => void,
    setTabPath: (p: string, newP: string) => void
) => {
    const resourceId = useResourceId();
    const renderer = useRenderer(Boolean(resourceId));

    const _initialPath = useRouter().asPath;
    const oldPath = useRef(_initialPath);

    const onRouteChange = useCallback(
        (path: string) => {
            if (!renderer) {
                oldPath.current = path;
                return;
            }

            const isParamChangeOnly = isSameTabOrg(oldPath.current, path);

            const shouldPush = !isParamChangeOnly;

            if (isParamChangeOnly) {
                setTabPath(oldPath.current, path);
            }

            if (shouldPush) {
                pushTabCb(
                    {
                        path,
                        renderer,
                        resourceId,
                    },
                    SHOULD_UPDATE_DATA
                );
            }

            oldPath.current = path;
        },
        [resourceId, renderer, pushTabCb, setTabPath]
    );

    useOnRouteChange(onRouteChange);
};

export default useTabPusher;
