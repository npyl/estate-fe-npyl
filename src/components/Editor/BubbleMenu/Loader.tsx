import {
    BubbleMenuPlugin,
    BubbleMenuPluginProps,
} from "@/components/Editor/extensions/BubbleMenu";
import React, { useEffect, useState } from "react";

import { useEditorContext } from "../context";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BubbleMenuProps = Omit<
    Optional<BubbleMenuPluginProps, "pluginKey">,
    "element" | "editor"
> & {
    className?: string;
    children: React.ReactNode;
    updateDelay?: number;
};

const Loader = (props: BubbleMenuProps) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const { editor } = useEditorContext();

    useEffect(() => {
        if (!element) {
            return;
        }

        if (editor?.isDestroyed) {
            return;
        }

        const {
            pluginKey = "bubbleMenu",
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

        return () => {
            editor.unregisterPlugin(pluginKey);
        };
    }, [editor, element]);

    return (
        <div
            ref={setElement}
            className={props.className}
            style={{ visibility: "hidden" }}
        >
            {props.children}
        </div>
    );
};

export default Loader;
