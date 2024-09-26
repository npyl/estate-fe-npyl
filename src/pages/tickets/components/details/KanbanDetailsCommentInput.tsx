// @mui
import { Box, Button, InputBase, Paper, Stack } from "@mui/material";
// components
import { useAuth } from "src/hooks/use-auth";
import { CustomAvatar } from "src/components/custom-avatar";
import { useTranslation } from "react-i18next";
import React, { useCallback, useState } from "react";
import { IKanbanComment, IKanbanCommentPOST } from "@/types/kanban";
import { useCreateCommentMutation } from "@/services/tickets";

// ----------------------------------------------------------------------

type Props = {
    comments: IKanbanComment[];
    onChange: (comments: IKanbanCommentPOST[]) => void;
    cardId: number;
};

export default function KanbanDetailsCommentInput({
    cardId,
    comments,
    onChange,
}: Props) {
    const { user } = useAuth();
    const { t } = useTranslation();

    const [currentComment, setCurrentComment] = useState("");
    const [createComment] = useCreateCommentMutation();

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCurrentComment(event.target.value);
    };

    const handleCommentSubmit = useCallback(() => {
        const newComment: IKanbanCommentPOST = {
            // id: 0,
            message: currentComment,
            messageType: "text",
        };

        createComment({ cardId, body: newComment })
            .unwrap()
            .then(() => {
                const newComments: IKanbanCommentPOST[] = [
                    ...comments,
                    { messageType: "text", message: currentComment },
                ];

                onChange(newComments);
                setCurrentComment("");
            })
            .catch((error) => {
                console.error("Error creating comment: ", error);
            });
    }, [comments, currentComment, createComment, onChange]);

    return (
        <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
            <CustomAvatar
                src={user?.profilePhoto}
                alt={user?.username}
                name={user?.username}
            />

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flexGrow={1}
            >
                <Paper variant="outlined" sx={{ p: 1, width: "100%" }}>
                    <InputBase
                        fullWidth
                        multiline
                        rows={2}
                        placeholder={t("Type a message") as string}
                        sx={{ px: 1 }}
                        value={currentComment}
                        onChange={handleCommentChange}
                    />
                </Paper>

                <Button
                    variant="contained"
                    onClick={handleCommentSubmit}
                    sx={{ mt: 2 }}
                >
                    {t("Comment")}
                </Button>
            </Box>
        </Stack>
    );
}
