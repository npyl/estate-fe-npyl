import { Editor, isTextSelection } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { BubbleMenuPluginProps, BubbleMenuViewProps } from "./types";

class BubbleMenuView {
    public editor: Editor;
    public element: HTMLElement;
    public view: EditorView;
    public preventHide = false;
    public updateDelay: number;
    private updateDebounceTimer: number | undefined;

    public shouldShow: Exclude<BubbleMenuPluginProps["shouldShow"], null> = ({
        view,
        state,
        from,
        to,
    }) => {
        const { doc, selection } = state;
        const { empty } = selection;

        // Sometime check for `empty` is not enough.
        // Doubleclick an empty paragraph returns a node size of 2.
        // So we check also for an empty text size.
        const isEmptyTextBlock =
            !doc.textBetween(from, to).length &&
            isTextSelection(state.selection);

        // When clicking on a element inside the bubble menu the editor "blur" event
        // is called and the bubble menu item is focussed. In this case we should
        // consider the menu as part of the editor and keep showing the menu
        const isChildOfMenu = this.element.contains(document.activeElement);

        const hasEditorFocus = view.hasFocus() || isChildOfMenu;

        if (
            !hasEditorFocus ||
            empty ||
            isEmptyTextBlock ||
            !this.editor.isEditable
        ) {
            return false;
        }

        return true;
    };

    constructor({
        editor,
        element,
        view,
        updateDelay = 250,
        shouldShow,
    }: BubbleMenuViewProps) {
        this.editor = editor;
        this.element = element;
        this.view = view;
        this.updateDelay = updateDelay;

        if (shouldShow) {
            this.shouldShow = shouldShow;
        }

        // Setup element
        this.setupElement();
    }

    // Setup Methods
    // ============

    private setupElement() {
        // Detaches menu content from its current parent
        this.element.remove();

        // Setup element styling
        this.element.style.pointerEvents = "auto";
    }

    // Update Logic
    // ===========

    update(view: EditorView, oldState?: EditorState) {
        const { state } = view;
        const hasValidSelection = state.selection.from !== state.selection.to;

        if (this.updateDelay > 0 && hasValidSelection) {
            this.handleDebouncedUpdate(view, oldState);
            return;
        }

        const selectionChanged = !oldState?.selection.eq(view.state.selection);
        const docChanged = !oldState?.doc.eq(view.state.doc);

        this.updateHandler(view, selectionChanged, docChanged, oldState);
    }

    handleDebouncedUpdate = (view: EditorView, oldState?: EditorState) => {
        const selectionChanged = !oldState?.selection.eq(view.state.selection);
        const docChanged = !oldState?.doc.eq(view.state.doc);

        if (!selectionChanged && !docChanged) {
            return;
        }

        if (this.updateDebounceTimer) {
            clearTimeout(this.updateDebounceTimer);
        }

        this.updateDebounceTimer = window.setTimeout(() => {
            this.updateHandler(view, selectionChanged, docChanged, oldState);
        }, this.updateDelay);
    };

    updateHandler = (
        view: EditorView,
        selectionChanged: boolean,
        docChanged: boolean,
        oldState?: EditorState
    ) => {
        const { state, composing } = view;
        const { selection } = state;

        const isSame = !selectionChanged && !docChanged;

        if (composing || isSame) {
            return;
        }

        // support for CellSelections
        const { ranges } = selection;
        const from = Math.min(...ranges.map((range) => range.$from.pos));
        const to = Math.max(...ranges.map((range) => range.$to.pos));

        const shouldShow = this.shouldShow?.({
            editor: this.editor,
            element: this.element,
            view,
            state,
            oldState,
            from,
            to,
        });

        if (!shouldShow) {
            this.hide();
            return;
        }

        this.show();
    };

    // UI Control
    // =========

    show() {
        if (!this.element) return;
        this.element.style.display = "";
        this.element.setAttribute("data-show", "");
    }

    hide() {
        if (!this.element) return;
        this.element.style.display = "none";
        this.element.removeAttribute("data-show");
    }

    // Lifecycle
    // ========

    destroy() {
        this.element.remove();
    }
}

export default BubbleMenuView;
