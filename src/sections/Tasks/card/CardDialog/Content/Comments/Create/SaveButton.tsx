import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { commentsKey } from "../contants";
import { IKanbanCommentPOST } from "@/types/tasks";
import { useAuth } from "@/hooks/use-auth";

const SaveButtonSx: SxProps<Theme> = {
    borderRadius: "12px",
};

interface SaveButtonProps {
    message?: string;
    onCreate: VoidFunction;
}

const SaveButton: FC<SaveButtonProps> = ({ message, onCreate }) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();

    const { user } = useAuth();

    const handleSave = useCallback(() => {
        const creatorId = user?.id;
        if (!message || creatorId === undefined) return;

        const old = (watch(commentsKey) as IKanbanCommentPOST[]) || [];

        const comment: IKanbanCommentPOST = { message, creatorId };

        setValue(commentsKey, [...old, comment], { shouldDirty: true });

        onCreate();
    }, [message, user?.id]);

    return (
        <InputAdornment position="end">
            <Button
                disabled={!message}
                variant="contained"
                sx={SaveButtonSx}
                onClick={handleSave}
            >
                {t("Add")}
            </Button>
        </InputAdornment>
    );
};

export default SaveButton;
