import { useMemo, useRef, useState } from "react";

import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// INFO: This is a custom implementation of yet-another-react-lightbox/plugins/fullscreen that triggers the events: fullscreen and fullscreenExited
import Fullscreen from "@/components/lightbox-plugins/fullscreen";
import HideGallery from "@/components/lightbox-plugins/hideGallery";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { FullscreenRef } from "yet-another-react-lightbox";

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

interface Props {
    open: boolean;
    images: { src: string }[];
    clickedImage: number;
    onClose: VoidFunction;
}

const FullscreenLightbox = ({ open, images, clickedImage, onClose }: Props) => {
    const [plugins, setPlugins] = useState(initialPluginList);

    const fullscreenRef = useRef<FullscreenRef>(null);
    const thumbnailsRef = useRef<ThumbnailsRef>(null);

    // Re-order images so clicked image is first
    const slides = useMemo(
        () => images.slice(clickedImage).concat(images.slice(0, clickedImage)),
        [images, clickedImage]
    );

    return (
        <Lightbox
            open={open}
            close={onClose}
            slides={slides}
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

export default FullscreenLightbox;
