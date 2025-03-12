import BubbleMenuPlugin, {
    BubbleMenuPluginProps,
} from "@/components/Editor/extensions/BubbleMenu";
import React, { useCallback, useLayoutEffect } from "react";

import { useEditorContext } from "../context";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const PLUGIN_KEY = "PPEditor-BubbleMenu";

type BubbleMenuProps = Omit<
    Optional<BubbleMenuPluginProps, "pluginKey">,
    "element" | "editor"
> & {
    children: React.ReactNode;
    updateDelay?: number;
};

const Loader = (props: BubbleMenuProps) => {
    const { editor } = useEditorContext();

    const onLoad = useCallback(
        (element: HTMLDivElement | null) => {
            if (!element) {
                return;
            }

            if (editor?.isDestroyed) {
                return;
            }

            const {
                pluginKey = PLUGIN_KEY,
                updateDelay,
                shouldShow = null,
            } = props;

            if (!editor) {
                console.warn(
                    "BubbleMenu component is not rendered inside of an editor component or does not have editor prop."
                );
                return;
            }

            const plugin = BubbleMenuPlugin({
                updateDelay,
                editor,
                element,
                pluginKey,
                shouldShow,
            });

            editor.registerPlugin(plugin);
        },
        [editor]
    );

    useLayoutEffect(() => {
        return () => {
            editor?.unregisterPlugin(PLUGIN_KEY);
        };
    }, []);

    return (
        <div ref={onLoad} style={{ visibility: "hidden" }}>
            {props.children}
        </div>
    );
};

export type { BubbleMenuProps };
export default Loader;
