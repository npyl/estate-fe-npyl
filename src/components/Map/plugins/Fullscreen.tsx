import { useLayoutEffect } from "react";
import { useMapContext } from "../Main/context";

const FullscreenPlugin = () => {
    const { mapRef } = useMapContext();

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
