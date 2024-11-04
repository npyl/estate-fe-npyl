import { LoadingButton } from "@mui/lab";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useImproveDescriptionMutation } from "@/services/properties";
import { useOpenAIDetails } from "../hooks";
import { IOpenAIDetailsPOST } from "@/types/openai";
import { EditorState } from "draft-js";
import OptionButton from "@/components/OptionButton";
import Options from "./Options";
import HistoryIcon from "@mui/icons-material/History";
import Button from "@mui/material/Button";
import { HideText } from "./style";

const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
    );
};

// -----------------------------------------------------------------------------

interface RevertButtonProps {
    revertContent: EditorState;
    onClick: (e: EditorState) => void;
}

const RevertButton: FC<RevertButtonProps> = ({ revertContent, onClick }) => {
    const handleClick = useCallback(
        () => onClick(revertContent),
        [revertContent, onClick]
    );

    return (
        <Button onClick={handleClick}>
            <HistoryIcon />
        </Button>
    );
};

// -----------------------------------------------------------------------------

interface ImproveButtonProps {
    lang: Language;
    editorState: EditorState;
    onImprove: (s: string, styling: boolean) => void;
    onRevert: (e: EditorState) => void;
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

    const [revertContent, setRevertContent] = useState<EditorState>();

    const [improveDescription, { isLoading: isImproving }] =
        useImproveDescriptionMutation();

    const handleImprove = async () => {
        try {
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

            onImprove(text, styling);

            setRevertContent(editorState);
        } catch (ex) {}
    };

    const handleRevert = useCallback((e: EditorState) => {
        setRevertContent(undefined);
        onRevert(e);
    }, []);

    return (
        <OptionButton
            options={
                <Options
                    styling={styling}
                    onStylingChange={setStyling}
                    improveOption={improveOption}
                    onImproveOptionChange={setImproveOption}
                />
            }
        >
            {revertContent ? (
                <RevertButton
                    revertContent={revertContent}
                    onClick={handleRevert}
                />
            ) : null}

            <LoadingButton
                loading={isImproving}
                loadingPosition="start"
                startIcon={<ChatGPTIcon />}
                variant="outlined"
                onClick={handleImprove}
                sx={{ mt: 0, justifySelf: "flex-end", ...HideText }}
            >
                {isImproving ? t("Improving...") : t("Improve")}
            </LoadingButton>
        </OptionButton>
    );
};

export default ImproveButton;
