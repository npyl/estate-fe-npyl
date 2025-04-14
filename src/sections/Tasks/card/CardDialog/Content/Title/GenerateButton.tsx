import LoadingButton from "@mui/lab/LoadingButton";
import { useGenerateTitleMutation } from "@/services/tasks";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { FC, RefObject, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Editor } from "@tiptap/react";
import { SxProps, Theme } from "@mui/material";
import { infoToast } from "@/components/Toaster";

const LITERAL0 = "_TITLE_GENERATE_EMPTY_DESCRIPTION0_";
const LITERAL1 = "_TITLE_GENERATE_EMPTY_DESCRIPTION1_";

const ButtonSx: SxProps<Theme> = {
    textTransform: "none",
    backgroundColor: "transparent",
    ":hover": {
        backgroundColor: "transparent",
        textDecoration: "underline",
    },
};

interface GenerateButtonProps {
    editorRef: RefObject<Editor>;
}

const GenerateButton: FC<GenerateButtonProps> = ({ editorRef }) => {
    const { t } = useTranslation();

    const { setValue } = useFormContext<ICreateOrUpdateTaskReq>();
    const [generate, { isLoading }] = useGenerateTitleMutation();

    const onClick = useCallback(async () => {
        if (!editorRef.current) return;

        const raw = editorRef.current.getText();
        if (!raw) {
            infoToast(LITERAL0, LITERAL1);
            return;
        }

        const res = await generate(raw);
        if ("error" in res) return;

        const { data } = res;

        setValue("name", data, { shouldDirty: true });
    }, []);

    return (
        <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="text"
            color="primary"
            fullWidth={false}
            sx={ButtonSx}
            onClick={onClick}
        >
            {t("Generate")}
        </LoadingButton>
    );
};

export default GenerateButton;
