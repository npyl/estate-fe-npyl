import { EditorState } from "draft-js";
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
import { textToEditorState } from "../util";

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
        const newEditorState = textToEditorState(s, styling);
        if (!newEditorState) return;
        setEditorState(newEditorState);
    }, []);

    return (
        <div ref={containerRef} style={{ display: "none" }}>
            <Head
                editorState={editorState}
                lang={lang}
                onImprove={handleImprove}
            />

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
