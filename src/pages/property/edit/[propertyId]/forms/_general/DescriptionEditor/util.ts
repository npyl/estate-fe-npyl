import { ContentState, convertFromHTML, EditorState } from "draft-js";

/**
 * Convert text to EditorState. Text can be plain or html (depending on styling)
 * styling: true -> html
 * styling: false -> plain
 */
const textToEditorState = (s: string, styling: boolean) => {
    let contentState: ContentState | null;

    if (styling) {
        // We received HTML string, convert it to ContentState
        const blocks = convertFromHTML(s);

        if (!blocks) return;

        contentState = ContentState.createFromBlockArray(
            blocks.contentBlocks,
            blocks.entityMap
        );
    } else {
        contentState = ContentState.createFromText(s);
    }

    return EditorState.createWithContent(contentState);
};

export { textToEditorState };
