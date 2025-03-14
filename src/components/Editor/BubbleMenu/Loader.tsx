import { Popper } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useEditorContext } from "../context";
import { BubbleMenuPluginProps } from "@/components/Editor/extensions/BubbleMenu";
import BubbleMenuPlugin from "@/components/Editor/extensions/BubbleMenu";
import { isNodeSelection, posToDOMRect } from "@tiptap/core";

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
    const [open, setOpen] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState<DOMRect | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);

    const pluginKey = `${PLUGIN_KEY}_${_pluginKey}`;

    // Virtual anchor element for MUI Popper
    const virtualAnchorEl = {
        nodeType: 1,
        getBoundingClientRect: () => anchorPosition || new DOMRect(0, 0, 0, 0),
        ownerDocument: {
            defaultView: window,
        },
    };

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        if (editor?.isDestroyed) {
            return;
        }

        if (!editor) {
            return;
        }

        // Create a custom shouldShow function that updates our state variables
        const wrappedShouldShow: BubbleMenuPluginProps["shouldShow"] = (
            params
        ) => {
            if (!shouldShow) return false;

            const shouldDisplay = shouldShow(params);

            // Only update state when necessary to avoid unnecessary rerenders
            if (shouldDisplay) {
                // Get the selection rectangle
                const { from, to, view } = params;
                const selectionRect = (() => {
                    const { state } = view;
                    const { selection } = state;

                    if (selection.empty) return null;

                    // Use the same logic as in BubbleMenuView
                    if (isNodeSelection(selection)) {
                        let node = view.nodeDOM(from) as HTMLElement;

                        if (node) {
                            const nodeViewWrapper = node.dataset.nodeViewWrapper
                                ? node
                                : node.querySelector(
                                      "[data-node-view-wrapper]"
                                  );

                            if (nodeViewWrapper) {
                                node =
                                    nodeViewWrapper.firstChild as HTMLElement;
                            }

                            if (node) {
                                return node.getBoundingClientRect();
                            }
                        }
                    }

                    return posToDOMRect(view, from, to);
                })();

                setAnchorPosition(selectionRect);
                setOpen(true);
            } else {
                setOpen(false);
            }

            return shouldDisplay;
        };

        const plugin = BubbleMenuPlugin({
            updateDelay,
            editor,
            element: elementRef.current,
            pluginKey,
            shouldShow: wrappedShouldShow,
        });

        editor.registerPlugin(plugin);

        return () => {
            editor?.unregisterPlugin(pluginKey);
        };
    }, [editor, pluginKey, updateDelay]);

    return (
        <>
            {/* Hidden div that the plugin will use for reference */}
            <div ref={elementRef} style={{ display: "none" }} />

            {/* MUI Popper component */}
            <Popper
                open={open}
                anchorEl={virtualAnchorEl as any}
                placement="top"
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            boundary: editor?.options.element,
                            padding: 8,
                        },
                    },
                ]}
            >
                {props.children}
            </Popper>
        </>
    );
};

export default Loader;
