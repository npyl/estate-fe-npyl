import { ContentState, convertFromHTML, EditorState } from "draft-js";
import {
    forwardRef,
    useCallback,
    useState,
    useImperativeHandle,
    useRef,
    Dispatch,
    SetStateAction,
} from "react";
import { Language } from "@/components/Language/types";
import DraftEditor from "@/components/draft-editor";
import Head from "./Head";

export interface GPTResultRef {
    div: HTMLDivElement | null;
    setEditorState: Dispatch<SetStateAction<EditorState>>;
}

interface GPTResultProps {
    lang: Language;
}

const GPTResult = forwardRef<GPTResultRef, GPTResultProps>(({ lang }, ref) => {
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
        ref,
        () => ({
            div: containerRef.current,
            setEditorState,
        }),
        [containerRef.current]
    );

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
        <div ref={containerRef} style={{ display: "none" }}>
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
});

GPTResult.displayName = "GPTResult";

export default GPTResult;
