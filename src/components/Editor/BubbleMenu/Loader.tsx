import { Popper } from "@mui/material";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useEditorContext } from "../context";
import { isNodeSelection, posToDOMRect } from "@tiptap/core";
import { ShouldShowProps } from "./types";

// TODO: fix popover moving on scroll;
// IMPORTANT: Some attempts to fixing this caused nested popovers to lose anchor and load on the top left corner so beware! lets consider it a feature for now!

interface LoaderProps extends PropsWithChildren {
    /**
     * A function that determines whether the menu should be shown or not.
     * If this function returns `false`, the menu will be hidden, otherwise it will be shown.
     */
    shouldShow: (props: ShouldShowProps) => boolean;
}

const Loader: FC<LoaderProps> = ({ children, shouldShow }) => {
    const { editor } = useEditorContext();

    const [open, setOpen] = useState(false);
    const anchorPosition = useRef<DOMRect | null>(null);

    const virtualAnchorEl = {
        nodeType: 1,
        getBoundingClientRect: () =>
            anchorPosition.current || new DOMRect(0, 0, 0, 0),
        ownerDocument: {
            defaultView: window,
        },
    };

    // Subscribe to editor updates
    const updateListener = useCallback(() => {
        if (!editor) return;
        if (!editor.state) return;

        const { state, view } = editor;
        const { selection } = state;
        const { from, to } = selection;

        // Skip if selection is empty
        if (from === to) {
            setOpen(false);
            return;
        }

        // Check if we should show the menu
        const shouldDisplay = shouldShow({
            editor,
            state,
            from,
            to,
        });

        if (shouldDisplay) {
            // Calculate selection rectangle
            const selectionRect = (() => {
                if (isNodeSelection(selection)) {
                    const domNode = view.nodeDOM(from);
                    if (domNode && domNode instanceof HTMLElement) {
                        const nodeViewWrapper = domNode.dataset.nodeViewWrapper
                            ? domNode
                            : domNode.querySelector("[data-node-view-wrapper]");

                        if (
                            nodeViewWrapper &&
                            nodeViewWrapper.firstChild instanceof HTMLElement
                        ) {
                            return nodeViewWrapper.firstChild.getBoundingClientRect();
                        }
                    }
                }
                return posToDOMRect(view, from, to);
            })();

            anchorPosition.current = selectionRect;
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        if (!editor) return;

        editor.on("selectionUpdate", updateListener);

        return () => {
            editor.off("selectionUpdate", updateListener);
        };
    }, []);

    return (
        <Popper open={open} anchorEl={virtualAnchorEl} placement="top">
            {children}
        </Popper>
    );
};

export default Loader;
