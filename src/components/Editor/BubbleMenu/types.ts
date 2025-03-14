import { Editor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";

interface ShouldShowProps {
    editor: Editor;
    state: EditorState;
    from: number;
    to: number;
}

export type { ShouldShowProps };
