import * as React from "react";

import {
    createIcon,
    IconButton,
    useLightboxProps,
} from "yet-another-react-lightbox/core";

const hideGallery = createIcon(
    "HideGalleryIcon",
    <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z" />
);

const unhideGallery = createIcon(
    "UnhideGalleryIcon",
    <path
        d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"
        style={{ transform: "scaleY(-1)", transformOrigin: "center" }}
    />
);

export function DownloadButton() {
    const { render, on } = useLightboxProps();

    const [clicked, setClicked] = React.useState(false);

    return (
        <IconButton
            label="Download"
            icon={clicked ? unhideGallery : hideGallery}
            renderIcon={
                clicked ? render.iconUnhideGallery : render.iconHideGallery
            }
            onClick={() => {
                if (!clicked) {
                    setClicked(true);
                    on.hideGalleryEntered?.();
                } else if (clicked) {
                    setClicked(false);
                    on.hideGalleryExited?.();
                }
            }}
        />
    );
}
