import { useCallback, useRef } from "react";
import { ITab } from "@/types/tabs";
import useResourceId from "./useResourceId";
import useOnRouteChange from "./useOnRouteChange";
import useRenderer from "./useRenderer";
import { useRouter } from "next/router";
import { isSameTabOrg } from "../useTabState";

const useTabPusher = (
    isTabExistent: (p: string) => boolean | null,
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

            const shouldPush =
                renderer && !isParamChangeOnly && !Boolean(isTabExistent(path));

            if (isParamChangeOnly) {
                setTabPath(oldPath.current, path);
            }

            if (shouldPush) {
                pushTabCb({
                    path,
                    renderer,
                    resourceId,
                });
            }

            oldPath.current = path;
        },
        [resourceId, renderer, pushTabCb, setTabPath]
    );

    useOnRouteChange(onRouteChange);
};

export default useTabPusher;
