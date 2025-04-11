import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCreateCommentMutation } from "@/services/tasks";
import { Box } from "@mui/material";

const SaveButtonSx: SxProps<Theme> = {
    borderRadius: "12px",
};

interface SaveButtonProps {
    cardId: number;
    message?: string;
    onCreate: VoidFunction;
}

const isMessageEmpty = (message?: string): boolean => {
    try {
        const parsed =
            typeof message === "string" ? JSON.parse(message) : message;

        return (
            !parsed?.content?.length ||
            (parsed.content.length === 1 &&
                parsed.content[0].type === "paragraph" &&
                (!parsed.content[0].content ||
                    parsed.content[0].content.length === 0))
        );
    } catch (e) {
        return true; // Assume empty if parse fails
    }
};

const SaveButton: FC<SaveButtonProps> = ({ cardId, message, onCreate }) => {
    const { t } = useTranslation();
    const [create] = useCreateCommentMutation();

    const handleSave = useCallback(async () => {
        if (!message || isMessageEmpty(message)) return;

        await create({ cardId, body: { message } });

        onCreate();
    }, [message]);
    const isDisabled = useMemo(() => isMessageEmpty(message), [message]);

    return (
        <Box display="flex" justifyContent="flex-end" mt={1.5} mb={1}>
            <Button
                disabled={isDisabled}
                variant="contained"
                sx={SaveButtonSx}
                onClick={handleSave}
            >
                {t("Add")}
            </Button>
        </Box>
    );
};

export default SaveButton;
