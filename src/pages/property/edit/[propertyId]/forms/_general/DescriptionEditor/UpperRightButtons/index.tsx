import { Stack } from "@mui/material";
import { Language } from "@/components/Language/types";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { textToEditorState } from "../util";
import { useCallback, useMemo } from "react";
const GenerateButton = dynamic(() => import("./GenerateButton"));
const ImproveButton = dynamic(() => import("./ImproveButton"));
const TranslateButton = dynamic(() => import("./TranslateButton"));

interface UpperRightOptionsProps {
    lang: Language;
    // ...
    editorState: EditorState;
    onContentChange: (e: EditorState) => void;
    onTranslate: (translatedTexts: string[]) => void;
}

const UpperRightOptions = ({
    onContentChange,
    onTranslate,
    lang,
    editorState,
}: UpperRightOptionsProps) => {
    const canTranslate = lang === "en";

    const isEmpty = useMemo(() => {
        const contentState = editorState.getCurrentContent();
        const plainText = contentState.getPlainText().trim();
        return contentState.getBlockMap().size === 1 && plainText.length === 0;
    }, [editorState]);

    const handleResult = useCallback(
        (s: string, styling: boolean) => {
            const editorState = textToEditorState(s, styling);
            if (!editorState) return;
            onContentChange(editorState);
        },
        [onContentChange]
    );

    return (
        <Stack direction="row" spacing={1}>
            {canTranslate ? (
                <TranslateButton onTranslate={onTranslate} />
            ) : null}

            {isEmpty ? (
                <GenerateButton lang={lang} onGenerate={handleResult} />
            ) : null}

            {!isEmpty ? (
                <ImproveButton
                    editorState={editorState}
                    lang={lang}
                    onImprove={handleResult}
                    onRevert={onContentChange}
                />
            ) : null}
        </Stack>
    );
};

export default UpperRightOptions;
