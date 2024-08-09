import { Callback, RenderFunction } from "yet-another-react-lightbox";
import { PLUGIN_DOWNLOAD } from "yet-another-react-lightbox/core";
import { HideGallery } from "./HideGallery";

declare module "yet-another-react-lightbox" {
    interface Render {
        /** render custom Download button */
        button?: RenderFunction;

        /** render custom icons */
        iconHideGallery?: RenderFunction;
        iconUnhideGallery?: RenderFunction;
    }

    interface Labels {
        Download?: string;
    }

    // noinspection JSUnusedGlobalSymbols
    interface Callbacks {
        hideGalleryEntered?: Callback;
        hideGalleryExited?: Callback;
    }

    // noinspection JSUnusedGlobalSymbols
    interface ToolbarButtonKeys {
        [PLUGIN_DOWNLOAD]: null;
    }
}

export default HideGallery;
