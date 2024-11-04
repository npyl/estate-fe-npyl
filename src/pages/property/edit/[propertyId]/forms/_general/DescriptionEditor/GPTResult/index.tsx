import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { forwardRef, useCallback, useState, useImperativeHandle } from "react";
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import Head from "./Head";

interface ChatGPTResultProps {
    lang: Language;
}

const ChatGPTResult = forwardRef<HTMLDivElement, ChatGPTResultProps>(
    ({ lang }, ref) => {
        const [editorState, setEditorState] = useState<EditorState>(
            EditorState.createEmpty()
        );

        useImperativeHandle(ref, () => ({
            setEditorState,
        }));

        const handleImprove = useCallback((s: string, styling: boolean) => {
            let contentState: ContentState | null = null;

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

            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }, []);

        return (
            <div ref={ref}>
                <Head lang={lang} onImprove={handleImprove} />

                <DraftEditor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    sx={{
                        minHeight: "700px",
                        height: "auto",
                    }}
                />
            </div>
        );
    }
);

ChatGPTResult.displayName = "ChatGPTResult";

export default ChatGPTResult;
