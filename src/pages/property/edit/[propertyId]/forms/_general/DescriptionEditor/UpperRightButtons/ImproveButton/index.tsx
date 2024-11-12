import { LoadingButton } from "@mui/lab";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useOpenAIDetails } from "../../hooks";
import { IOpenAIDetailsPOST } from "@/types/openai";
import { EditorState } from "draft-js";
import OptionButton from "@/components/OptionButton";
import Options from "../Options";
import { HideText } from "../style";
import { useOperationsContext } from "../../context";
import HistoryButtons, { HistoryButtonRef } from "./HistoryButton";

const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
    );
};

// -----------------------------------------------------------------------------

interface ImproveButtonProps {
    lang: Language;
    editorState: EditorState;
    onImprove: (s: string, styling: boolean) => EditorState | undefined;
    onRevert: (e: EditorState) => void; // INFO: revert back & forth
}

const ImproveButton: FC<ImproveButtonProps> = ({
    editorState,
    lang,
    onImprove,
    onRevert,
}) => {
    const { t } = useTranslation();

    const { openAIDetails } = useOpenAIDetails(lang);

    const [improveOption, setImproveOption] = useState("PRECISE");
    const [styling, setStyling] = useState(false);

    const historyRef = useRef<HistoryButtonRef>(null);
    const [isPast, setPast] = useState(false); // INFO: this guard makes sure every push() happens when the user is looking at the latest improvement; avoid confusion

    const { improveDescription, isLoading } = useOperationsContext();

    const handleImprove = async () => {
        try {
            // INFO: we need an initial state
            if (historyRef.current?.getSize() === 0) {
                historyRef.current.initialise(editorState);
            }

            const oldDescription = editorState
                .getCurrentContent()
                .getPlainText();
            if (!oldDescription) return;

            const sanitizedPayload = sanitizePayload({
                ...openAIDetails,
                oldDescription,
                improveOption,
                styling,
            });

            const text = await improveDescription(sanitizedPayload).unwrap();

            const newEditorState = onImprove(text, styling);
            if (!newEditorState) return;

            historyRef.current?.push(newEditorState);
        } catch (ex) {}
    };

    return (
        <>
            <HistoryButtons
                ref={historyRef}
                onPastChange={setPast}
                onRevert={onRevert}
            />

            <OptionButton
                disabled={isLoading || isPast}
                options={
                    <Options
                        styling={styling}
                        onStylingChange={setStyling}
                        improveOption={improveOption}
                        onImproveOptionChange={setImproveOption}
                    />
                }
            >
                <LoadingButton
                    disabled={isLoading}
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<ChatGPTIcon />}
                    variant="outlined"
                    onClick={handleImprove}
                    sx={{ mt: 0, justifySelf: "flex-end", ...HideText }}
                >
                    {isLoading ? t("Improving...") : t("Improve")}
                </LoadingButton>
            </OptionButton>
        </>
    );
};

export default ImproveButton;
