import RHFTextField from "@/components/hook-form/RHFTextField";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import GenerateButton from "./GenerateButton";
import { FC, RefObject } from "react";
import { Editor } from "@tiptap/react";
import { TASK } from "@/constants/tests";

interface TitleProps {
    editorRef: RefObject<Editor>;
}

const Title: FC<TitleProps> = ({ editorRef }) => {
    const { t } = useTranslation();
    return (
        <Stack alignItems="start">
            <RHFTextField
                data-testid={TASK.TITLE_ID}
                name="name"
                label={t("Title")}
                fullWidth
            />
            <GenerateButton editorRef={editorRef} />
        </Stack>
    );
};

export default Title;
