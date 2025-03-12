import { Editor } from "@tiptap/core";
import { EditorState, PluginKey } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { Options } from "@popperjs/core";

interface BubbleMenuPluginProps {
    /**
     * The plugin key.
     * @type {PluginKey | string}
     * @default 'bubbleMenu'
     */
    pluginKey: PluginKey | string;

    /**
     * The editor instance.
     */
    editor: Editor;

    /**
     * The DOM element that contains your menu.
     * @type {HTMLElement}
     * @default null
     */
    element: HTMLElement;

    /**
     * The delay in milliseconds before the menu should be updated.
     * This can be useful to prevent performance issues.
     * @type {number}
     * @default 250
     */
    updateDelay?: number;

    /**
     * A function that determines whether the menu should be shown or not.
     * If this function returns `false`, the menu will be hidden, otherwise it will be shown.
     */
    shouldShow?:
        | ((props: {
              editor: Editor;
              element: HTMLElement;
              view: EditorView;
              state: EditorState;
              oldState?: EditorState;
              from: number;
              to: number;
          }) => boolean)
        | null;

    /**
     * Popper.js options
     */
    popperOptions?: Partial<Options>;
}

type BubbleMenuViewProps = BubbleMenuPluginProps & {
    view: EditorView;
};

export type { BubbleMenuPluginProps, BubbleMenuViewProps };
