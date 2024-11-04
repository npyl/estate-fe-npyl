import { LoadingButton } from "@mui/lab";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import ChatGPTIcon from "@/assets/icons/GPTIcon";
import { useImproveDescriptionMutation } from "@/services/properties";
import { useOpenAIDetails } from "../hooks";
import { IOpenAIDetailsPOST } from "@/types/openai";
import { convertToRaw, EditorState } from "draft-js";
import OptionButton from "@/components/OptionButton";
import Options from "./Options";

const sanitizePayload = (payload: IOpenAIDetailsPOST) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
    );
};

interface ImproveButtonProps {
    lang: Language;
    editorState: EditorState;
    onImprove: (s: string, styling: boolean) => void;
}

const ImproveButton: FC<ImproveButtonProps> = ({
    editorState,
    lang,
    onImprove,
}) => {
    const { t } = useTranslation();

    const { openAIDetails } = useOpenAIDetails(lang);

    const [improveOption, setImproveOption] = useState("PRECISE");
    const [styling, setStyling] = useState(false);

    const [improveDescription, { isLoading: isImproving }] =
        useImproveDescriptionMutation();

    const handleImprove = async () => {
        const contentState = editorState.getCurrentContent();
        const oldDescription = JSON.stringify(convertToRaw(contentState)) || "";

        const sanitizedPayload = sanitizePayload({
            ...openAIDetails,
            oldDescription,
            improveOption,
            styling,
        });

        const text = await improveDescription(sanitizedPayload).unwrap();

        onImprove(text, styling);
    };

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
            <LoadingButton
                loading={isImproving}
                loadingPosition="start"
                startIcon={<ChatGPTIcon />}
                variant="outlined"
                onClick={handleImprove}
                sx={{ mt: 0, justifySelf: "flex-end" }}
            >
                {isImproving ? t("Improving...") : t("Improve")}
            </LoadingButton>
        </OptionButton>
    );
};

export default ImproveButton;
