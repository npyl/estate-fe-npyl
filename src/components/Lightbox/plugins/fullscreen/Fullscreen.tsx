import * as React from "react";

import { PluginProps } from "yet-another-react-lightbox";
import {
    addToolbarButton,
    createModule,
    MODULE_CONTROLLER,
    PLUGIN_FULLSCREEN,
    PLUGIN_THUMBNAILS,
} from "yet-another-react-lightbox/core";
import { resolveFullscreenProps } from "./props";
import { FullscreenButton } from "./FullscreenButton";
import { FullscreenContextProvider } from "./FullscreenContext";

/** Fullscreen plugin */
export function Fullscreen({ augment, contains, addParent }: PluginProps) {
    augment(({ fullscreen, toolbar, ...restProps }) => ({
        toolbar: addToolbarButton(
            toolbar,
            PLUGIN_FULLSCREEN,
            <FullscreenButton />
        ),
        fullscreen: resolveFullscreenProps(fullscreen),
        ...restProps,
    }));

    addParent(
        contains(PLUGIN_THUMBNAILS) ? PLUGIN_THUMBNAILS : MODULE_CONTROLLER,
        createModule(PLUGIN_FULLSCREEN, FullscreenContextProvider)
    );
}
