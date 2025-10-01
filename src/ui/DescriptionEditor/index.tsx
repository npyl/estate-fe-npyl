import Typography from "@mui/material/Typography";
import { FC, forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "@/components/hook-form";
import TabbedBox, { TabbedBoxProps } from "./TabbedBox";
import { TABS } from "./constants";
import {
    OperationsProvider,
    useOperationsContext,
} from "./context/OperationsContext";
import useNames from "./useNames";
import UpperRightButtons from "./UpperRightButtons";
import { EditorHandleProvider } from "./context/EditorHandle";
import { Language } from "@/components/LanguageButton/types";
import Box from "@mui/material/Box";
import GenerateTitleButton from "./GenerateTitleButton";
import Stack from "@mui/material/Stack";
import { SpaceBetween } from "@/components/styled";
import { EditorRef } from "@/components/Editor";
import Editor from "./Editor";

interface TitleDescriptionEditorProps
    extends Omit<
        TabbedBoxProps,
        "tabs" | "selected" | "disabled" | "onSelect" | "children"
    > {}

const TitleDescriptionEditor: FC<TitleDescriptionEditorProps> = (props) => {
    const { t } = useTranslation();

    const [lang, setLang] = useState<Language>("el");
    const { title, descriptionName, descriptionTextName } = useNames(lang);

    const { isLoading } = useOperationsContext();

    return (
        <TabbedBox<Language>
            tabs={TABS}
            selected={lang}
            disabled={isLoading}
            onSelect={setLang}
            {...props}
        >
            <Stack spacing={1}>
                <SpaceBetween direction="row" alignItems="center">
                    <Typography variant="h6" flex={1}>
                        {`${t("Title")} (${lang})`}
                    </Typography>
                    <GenerateTitleButton lang={lang} />
                </SpaceBetween>
                <RHFTextField fullWidth key={title} name={title} />
            </Stack>

            <Box />

            <Stack spacing={1}>
                <SpaceBetween direction="row" alignItems="center">
                    <Typography variant="h6" flex={1}>
                        {`${t("Description")} (${lang})`}
                    </Typography>
                    <UpperRightButtons lang={lang} />
                </SpaceBetween>
                <Editor
                    name={descriptionTextName}
                    descriptionName={descriptionName}
                />
            </Stack>
        </TabbedBox>
    );
};

const WithProvider = forwardRef<EditorRef, TitleDescriptionEditorProps>(
    (props, ref) => (
        <EditorHandleProvider ref={ref}>
            <OperationsProvider>
                <TitleDescriptionEditor {...props} />
            </OperationsProvider>
        </EditorHandleProvider>
    )
);

export default WithProvider;
