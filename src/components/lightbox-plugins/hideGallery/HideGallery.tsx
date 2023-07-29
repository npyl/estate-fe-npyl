import * as React from "react";

import { PluginProps } from "yet-another-react-lightbox";
import {
    addToolbarButton,
    PLUGIN_DOWNLOAD,
} from "yet-another-react-lightbox/core";
import { DownloadButton } from "./DownloadButton";

export function HideGallery({ augment }: PluginProps) {
    augment(({ toolbar, ...restProps }) => ({
        toolbar: addToolbarButton(toolbar, PLUGIN_DOWNLOAD, <DownloadButton />),
        ...restProps,
    }));
}
