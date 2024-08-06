import YARLightbox, {
    ThumbnailsRef,
    FullscreenRef,
} from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";

// INFO: This is a custom implementation of yet-another-react-lightbox/plugins/fullscreen that triggers the events: fullscreen and fullscreenExited
import Fullscreen from "./plugins/fullscreen";
import HideGallery from "./plugins/hideGallery";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import React, { useMemo, useRef, useState } from "react";

type TLightboxImage<T extends {} = {}> = { url: string | null } & T;

const initialPluginList = [
    Captions,
    Fullscreen,
    Thumbnails,
    Video,
    Zoom,
    Counter,
];

const pluginListWithHideGallery = [
    Captions,
    Fullscreen,
    Thumbnails,
    Video,
    Zoom,
    Counter,
    HideGallery,
];

interface LightboxProps {
    open: boolean;
    images: TLightboxImage[];
    index?: number;
    onClose: VoidFunction;
}

const Lightbox: React.FC<LightboxProps> = ({
    open,
    images,
    index,
    onClose,
}) => {
    const fullscreenRef = useRef<FullscreenRef>(null);
    const thumbnailsRef = useRef<ThumbnailsRef>(null);

    const [plugins, setPlugins] = useState(initialPluginList);

    const slides = useMemo(
        () => images?.map(({ url }) => ({ src: url || "" })),
        [images]
    );

    return (
        <YARLightbox
            open={open}
            close={onClose}
            slides={slides}
            index={index}
            plugins={plugins}
            carousel={{ finite: true }}
            fullscreen={{ ref: fullscreenRef }}
            thumbnails={{ ref: thumbnailsRef }}
            on={{
                fullscreen() {
                    // add HideGallery to the plugins
                    setPlugins(pluginListWithHideGallery);
                },
                fullscreenExit() {
                    // remove HideGallery
                    setPlugins(initialPluginList);
                },

                hideGalleryEntered() {
                    thumbnailsRef.current?.hide();
                },
                hideGalleryExited() {
                    thumbnailsRef.current?.show();
                },
            }}
        />
    );
};

export default Lightbox;
