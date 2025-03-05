import { LoadingButton } from "@mui/lab";
import { FC, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/LanguageButton/types";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import useOpenAIDetails from "../useOpenAIDetails";
import { IOpenAIDetailsPOST } from "@/types/openai";
import OptionButton from "@/components/OptionButton";
import Options from "./Options";
import { PopoverProps } from "../style";
import { useOperationsContext } from "../../context/OperationsContext";
import HistoryButtons, { HistoryButtonRef } from "./HistoryButton";
import { HideText } from "@/components/styled";
import { useEditorHandleContext } from "../../context/EditorHandle";

const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
    );
};

// -----------------------------------------------------------------------------

interface ImproveButtonProps {
    lang: Language;
}

const ImproveButton: FC<ImproveButtonProps> = ({ lang }) => {
    const { t } = useTranslation();

    const { openAIDetails } = useOpenAIDetails(lang);

    const [improveOption, setImproveOption] = useState("PRECISE");
    const [styling, setStyling] = useState(false);

    const historyRef = useRef<HistoryButtonRef>(null);
    const [isPast, setPast] = useState(false); // INFO: this guard makes sure every push() happens when the user is looking at the latest improvement; avoid confusion

    const { editorRef } = useEditorHandleContext();
    const { improveDescription, isLoading } = useOperationsContext();

    const handleImprove = async () => {
        try {
            const oldDescription = editorRef.current?.getHTML();
            if (!oldDescription) return;

            // INFO: we need an initial state
            if (historyRef.current?.getSize() === 0) {
                historyRef.current.initialise(oldDescription);
            }

            const sanitizedPayload = sanitizePayload({
                ...openAIDetails,
                oldDescription,
                improveOption,
                styling,
            });

            const text = await improveDescription(sanitizedPayload).unwrap();

            editorRef.current?.commands.setContent(text, true);

            historyRef.current?.push(text);
        } catch (ex) {}
    };

    const onRevert = useCallback((s: string) => {
        editorRef.current?.commands.setContent(s, true);
    }, []);

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
                popoverProps={PopoverProps}
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
