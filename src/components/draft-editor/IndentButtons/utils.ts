import { EditorState, Modifier, ContentBlock } from "draft-js";

// Function to increase indent for selected blocks
export const increaseIndent = (
    editorState: EditorState,
    setEditorState: (state: EditorState) => void
) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);

    // Get current indent level and increment it
    const currentIndent = block.getData().get("indent") || 0;
    const newIndent = currentIndent + 20;

    const newBlockData = block.getData().set("indent", newIndent);

    const newContentState = Modifier.setBlockData(
        contentState,
        selection,
        newBlockData
    );
    const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-block-data"
    );

    setEditorState(newEditorState);
};

// Function to decrease indent for selected blocks
export const decreaseIndent = (
    editorState: EditorState,
    setEditorState: (state: EditorState) => void
) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);

    // Get current indent level and decrease it
    const currentIndent = block.getData().get("indent") || 0;
    const newIndent = Math.max(0, currentIndent - 20);

    const newBlockData = block.getData().set("indent", newIndent);

    const newContentState = Modifier.setBlockData(
        contentState,
        selection,
        newBlockData
    );
    const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-block-data"
    );

    setEditorState(newEditorState);
};

export const indentStyleFn = (contentBlock: ContentBlock) => {
    const indent = contentBlock.getData().get("indent") || 0;
    if (indent > 0) {
        return `indent-${indent}`; // Apply class like "indent-20", "indent-40", etc.
    }
    return null;
};
