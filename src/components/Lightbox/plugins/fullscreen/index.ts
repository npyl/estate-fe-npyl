import * as React from "react";

import { Callback, RenderFunction } from "yet-another-react-lightbox";
import { PLUGIN_FULLSCREEN } from "yet-another-react-lightbox/core";
import { Fullscreen } from "./Fullscreen";

declare module "yet-another-react-lightbox" {
    interface LightboxProps {
        /** Fullscreen plugin settings */
        fullscreen?: {
            /** Fullscreen plugin ref */
            ref?: React.ForwardedRef<FullscreenRef>;
            /** if `true`, enter fullscreen mode automatically when the lightbox opens */
            auto?: boolean;
        };
    }

    interface Labels {
        "Exit Fullscreen"?: string;
        "Enter Fullscreen"?: string;
    }

    interface Render {
        /** render custom Enter/Exit Fullscreen button */
        buttonFullscreen?: RenderFunction<FullscreenRef>;
        /** render custom Enter Fullscreen icon */
        iconEnterFullscreen?: RenderFunction;
        /** render custom Exit Fullscreen icon */
        iconExitFullscreen?: RenderFunction;
    }

    // noinspection JSUnusedGlobalSymbols
    interface Callbacks {
        /** a callback called on slide download */
        fullscreen?: Callback;
        fullscreenExit?: Callback;
    }

    // noinspection JSUnusedGlobalSymbols
    interface ToolbarButtonKeys {
        [PLUGIN_FULLSCREEN]: null;
    }

    /** Fullscreen plugin ref */
    export interface FullscreenRef {
        /** current fullscreen status */
        fullscreen: boolean;
        /** if `true`, fullscreen features are not available */
        disabled: boolean | undefined;
        /** enter fullscreen mode */
        enter: Callback;
        /** exit fullscreen mode */
        exit: Callback;
    }
}

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Document {
        webkitFullscreenEnabled?: boolean;
        mozFullScreenEnabled?: boolean;
        msFullscreenEnabled?: boolean;

        webkitExitFullscreen?: () => void;
        mozCancelFullScreen?: () => void;
        msExitFullscreen?: () => void;

        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
    }

    // noinspection JSUnusedGlobalSymbols
    interface HTMLElement {
        webkitRequestFullscreen?: () => void;
        mozRequestFullScreen?: () => void;
        msRequestFullscreen?: () => void;
    }
}

export default Fullscreen;
