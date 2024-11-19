import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useCreateCommentMutation } from "@/services/tasks";

const SaveButtonSx: SxProps<Theme> = {
    borderRadius: "12px",
};

interface SaveButtonProps {
    cardId: number;
    message?: string;
    onCreate: VoidFunction;
}

const SaveButton: FC<SaveButtonProps> = ({ cardId, message, onCreate }) => {
    const { t } = useTranslation();
    const [create] = useCreateCommentMutation();

    const handleSave = useCallback(async () => {
        if (!message) return;

        await create({ cardId, body: { message } });

        onCreate();
    }, [message]);

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
