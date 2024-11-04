import {
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/Language/types";
import { useGlobals } from "@/hooks/useGlobals";
import { SpaceBetween } from "@/components/styled";
import ImproveButton from "./ImproveButton";
import { EditorState } from "draft-js";

interface HeadProps {
    lang: Language;
    editorState: EditorState;
    onImprove: (s: string, styling: boolean) => void;
}

const Head: FC<HeadProps> = ({ lang, editorState, onImprove }) => {
    const { t } = useTranslation();

    const options = useGlobals();
    const improvementOptions = options?.property?.descriptionImprovementOptions;

    const [selectedOption, setSelectedOption] = useState<string>("PRECISE");
    const [styling, setStyling] = useState(false);

    const handleSelectChange = (event: any) =>
        setSelectedOption(event.target.value);

    const handleStylingChange = (event: any) =>
        setStyling(event.target.checked);

    return (
        <>
            <Typography variant="h6" mt={1}>
                {`${t("ChatGPT Result")} (${lang})`}
            </Typography>

            <SpaceBetween alignItems="center" mb={1}>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        maxWidth="160px"
                    >
                        {t("Improving the description to be more:")}
                    </Typography>

                    <Select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        displayEmpty
                        variant="outlined"
                        sx={{ minWidth: "100px", mr: 1 }}
                    >
                        {improvementOptions?.map((option) => (
                            <MenuItem key={option.key} value={option.key}>
                                {t(option.value)}
                            </MenuItem>
                        ))}
                    </Select>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={styling}
                                onChange={handleStylingChange}
                            />
                        }
                        label={t("RTF")}
                    />
                </Stack>

                <ImproveButton
                    editorState={editorState}
                    lang={lang}
                    styling={styling}
                    improveOption={selectedOption}
                    onImprove={onImprove}
                />
            </SpaceBetween>
        </>
    );
};

export default Head;
