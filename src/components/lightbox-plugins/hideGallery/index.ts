import { Callback, RenderFunction } from "yet-another-react-lightbox";
import { PLUGIN_DOWNLOAD } from "yet-another-react-lightbox/core";
import { HideGallery } from "./HideGallery";

declare module "yet-another-react-lightbox" {
    interface GenericSlide {
        /** download url */
        downloadUrl?: string;
        /** download filename override */
        downloadFilename?: string;
    }

    interface Render {
        /** render custom Download button */
        buttonDownload?: RenderFunction;
        /** render custom Download icon */
        iconDownload?: RenderFunction;
    }

    // noinspection JSUnusedGlobalSymbols
    interface Callbacks {
        hideGalleryEntered?: Callback;
        hideGalleryExited?: Callback;
    }

    export interface DownloadCallbackProps {
        index: number;
    }

    // noinspection JSUnusedGlobalSymbols
    interface ToolbarButtonKeys {
        [PLUGIN_DOWNLOAD]: null;
    }
}

export default HideGallery;
