import Typography from "@mui/material/Typography";
import { FC, forwardRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "@/components/hook-form";
import TabbedBox, { TabbedBoxProps } from "./TabbedBox";
import { TABS } from "./constants";
import {
    OperationsProvider,
    useOperationsContext,
} from "./context/OperationsContext";
import RHFEditor from "@/components/hook-form/dynamic/RHFEditor";
import useNames from "./useNames";
import UpperRightButtons from "./UpperRightButtons";
import {
    EditorHandleProvider,
    useEditorHandleContext,
} from "./context/EditorHandle";
import { Language } from "@/components/LanguageButton/types";
import Box from "@mui/material/Box";
import GenerateTitleButton from "./GenerateTitleButton";
import Stack from "@mui/material/Stack";
import { SpaceBetween } from "@/components/styled";
import { Editor } from "@tiptap/react";

interface TitleDescriptionEditorProps
    extends Omit<
        TabbedBoxProps,
        "tabs" | "selected" | "disabled" | "onSelect" | "children"
    > {}

const TitleDescriptionEditor: FC<TitleDescriptionEditorProps> = (props) => {
    const { t } = useTranslation();

    const { onRef } = useEditorHandleContext();

    const [lang, setLang] = useState<Language>("el");
    const { title, descriptionName, descriptionTextName } = useNames(lang);

    const { isLoading } = useOperationsContext();

    const { setValue } = useFormContext();
    const handlePlainTextChange = (plain: string) =>
        setValue(descriptionTextName, plain);

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
                <RHFEditor
                    ref={onRef}
                    name={descriptionName}
                    onPlainTextChange={handlePlainTextChange}
                />
            </Stack>
        </TabbedBox>
    );
};

const WithProvider = forwardRef<Editor, TitleDescriptionEditorProps>(
    (props, ref) => (
        <EditorHandleProvider ref={ref}>
            <OperationsProvider>
                <TitleDescriptionEditor {...props} />
            </OperationsProvider>
        </EditorHandleProvider>
    )
);

export default WithProvider;
