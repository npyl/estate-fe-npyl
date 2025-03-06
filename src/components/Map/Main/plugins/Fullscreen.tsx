import { FC, MutableRefObject, useLayoutEffect } from "react";

interface FullscreenPluginProps {
    mapRef: MutableRefObject<google.maps.Map | undefined>;
}

const FullscreenPlugin: FC<FullscreenPluginProps> = ({ mapRef }) => {
    // fullscreenElement;

    const toggleFullscreen = () => {};

    useLayoutEffect(() => {
        document.addEventListener("fullscreenchange", toggleFullscreen);
        return () => {
            document.removeEventListener("fullscreenchange", toggleFullscreen);
        };
    }, []);

    return null;
};

export default FullscreenPlugin;
