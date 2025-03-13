import BubbleMenuPlugin, {
    BubbleMenuPluginProps,
} from "@/components/Editor/extensions/BubbleMenu";
import React, { FC, useEffect, useState } from "react";

import { useEditorContext } from "../context";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const PLUGIN_KEY = "PPEditor-BubbleMenu";

type LoaderProps = Omit<
    Optional<BubbleMenuPluginProps, "pluginKey">,
    "element" | "editor"
> & {
    children: React.ReactNode;
    pluginKey: string;
    updateDelay?: number;
};

const Loader: FC<LoaderProps> = ({
    pluginKey: _pluginKey,
    updateDelay,
    shouldShow = null,
    ...props
}) => {
    const { editor } = useEditorContext();
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    const pluginKey = `${PLUGIN_KEY}_${_pluginKey}`;

    useEffect(() => {
        if (!element) {
            return;
        }

        if (editor?.isDestroyed) {
            return;
        }

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

        return () => {
            editor?.unregisterPlugin(PLUGIN_KEY);
        };
    }, [editor, element]);

    return (
        <div ref={setElement} style={{ display: "none" }}>
            {props.children}
        </div>
    );
};

export default Loader;
