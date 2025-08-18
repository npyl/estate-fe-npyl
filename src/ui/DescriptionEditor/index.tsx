import Typography from "@mui/material/Typography";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
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
import { getAllContainers } from "@/components/Editor/extensions/Image";

const IMG_CONTAINER_STYLE =
    "display: flex; flex-direction: row; gap: 8px; height: fit-content; width: 100%;";
const IMG_STYLE =
    "width: 50%; height: auto; object-fit: fit; border-radius: 8px;";

interface TitleDescriptionEditorRef {
    addImages: (sources: string[]) => void;
}

interface TitleDescriptionEditorProps
    extends Omit<
        TabbedBoxProps,
        "tabs" | "selected" | "disabled" | "onSelect" | "children"
    > {}

const TitleDescriptionEditor = forwardRef<
    TitleDescriptionEditorRef,
    TitleDescriptionEditorProps
>((props, ref) => {
    const { t } = useTranslation();

    const { editorRef } = useEditorHandleContext();
    const addImages = useCallback((sources: string[]) => {
        const editor = editorRef.current;
        if (!editor || sources.length === 0) return;

        editor.commands.createContainer({
            HTMLAttributes: {
                style: IMG_CONTAINER_STYLE,
            },
        });

        const containers = getAllContainers(editor.state);
        const latestContainer = containers[containers.length - 1];

        editor.commands.addImageToContainer(latestContainer.pos, sources, {
            style: IMG_STYLE,
        });
    }, []);
    useImperativeHandle(ref, () => ({ addImages }), []);

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
                    ref={editorRef}
                    name={descriptionName}
                    onPlainTextChange={handlePlainTextChange}
                />
            </Stack>
        </TabbedBox>
    );
});

const WithProvider = forwardRef<
    TitleDescriptionEditorRef,
    TitleDescriptionEditorProps
>((props, ref) => (
    <EditorHandleProvider>
        <OperationsProvider>
            <TitleDescriptionEditor ref={ref} {...props} />
        </OperationsProvider>
    </EditorHandleProvider>
));

export type { TitleDescriptionEditorRef };
export default WithProvider;
