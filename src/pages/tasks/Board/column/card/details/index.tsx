import { useCallback, useEffect, useRef, useState } from "react";
// @mui
import {
    Divider,
    Stack,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// @types
import {
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanCommentPOST,
} from "src/types/kanban";
// Kanban
import KanbanContactsDialog from "./KanbanContactsDialog";
import KanbanDetailsAttachments from "./KanbanDetailsAttachments";
import KanbanDetailsCommentInput from "./KanbanDetailsCommentInput";
import KanbanDetailsCommentList from "./KanbanDetailsCommentList";
import KanbanDetailsPrioritizes from "./KanbanDetailsPrioritizes";
import KanbanDetailsToolbar from "./KanbanDetailsToolbar";
import {
    useEditCardMutation,
    useMoveCardMutation,
    useGetBoardQuery,
} from "src/services/tickets"; // Add useMoveCardMutation and useGetBoardQuery
import { StyledLabel } from "./styled";
import Description from "./Description";
import Name from "./Name";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
    task: IKanbanCard;
    onClose: VoidFunction;
    onDeleteTask: VoidFunction;
};

export default function KanbanDetails({ task, onClose, onDeleteTask }: Props) {
    const {
        id,
        completed,
        priority,
        name,
        description,
        user,
        due,
        comments,
        attachments,
    } = task;

    const [liked, setLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // For the clicked image modal
    const theme = useTheme();
    const scrollbarColor = theme.palette.mode === "dark" ? "#444" : "#bbb";
    const scrollbarHoverColor = theme.palette.mode === "dark" ? "#666" : "#888";
    const scrollbarTrackColor =
        theme.palette.mode === "dark" ? "#222" : "#f1f1f1";
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [editCard] = useEditCardMutation();
    const [moveCard] = useMoveCardMutation();
    const { data: board } = useGetBoardQuery();

    const [currentColumnId, setCurrentColumnId] = useState(task.id);
    const previousTaskId = useRef(task.id);

    const handleLiked = useCallback(() => setLiked((old) => !old), []);
    const handleClickAttach = () => fileInputRef.current?.click();

    const handleUpdate = useCallback(
        (card: Partial<IKanbanCardPOST>) => {
            const payload = {
                id,
                name: name,
                description,
                priority,
                completed,
                userIds: user.map((u) => u.id),
                attachments,
                ...card,
            };

            editCard(payload);
        },
        [
            id,
            name,
            description,
            priority,
            completed,
            user,
            comments,
            attachments,
        ]
    );

    const toggleCompleted = useCallback(async () => {
        const doneColumn = board?.columns.find((col) => col.name === "DONE");
        const inProgressColumn = board?.columns.find(
            (col) => col.name === "IN PROGRESS"
        );

        if (!doneColumn || !inProgressColumn) return;

        // Mark the card as completed
        await editCard({
            id,
            name,
            attachments,
            description,
            priority,
            completed: !completed,
            userIds: user.map((u) => u.id),
        });

        // Move the card to the DONE column
        if (!completed) {
            moveCard({
                cardId: id,
                srcColumnId: currentColumnId,
                dstColumnId: doneColumn.id,
            });
            setCurrentColumnId(doneColumn.id);
        } else {
            // If it's being unchecked, move it back to the IN PROGRESS column
            moveCard({
                cardId: id,
                srcColumnId: currentColumnId,
                dstColumnId: inProgressColumn.id,
            });
            setCurrentColumnId(inProgressColumn?.id);
        }
        console.log(`progress: ${inProgressColumn}`);
        console.log(`done: ${doneColumn}`);
    }, [
        board,
        id,
        name,
        attachments,
        description,
        priority,
        completed,
        user,
        currentColumnId,
        editCard,
        moveCard,
    ]);

    useEffect(() => {
        // Reset the task details if the task id changes
        if (previousTaskId.current !== task.id) {
            previousTaskId.current = task.id;
        }
    }, [task.id, moveCard, completed]);

    const handleChangePriority = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            editCard({
                id,
                name,
                description,
                attachments,
                priority: +event.target.value,
                completed,
                userIds: user.map((u) => u.id),
            }),
        [id, name, attachments, description, completed, user]
    );

    const handleToggleAssignee = useCallback(
        (userId: number) => {
            const oldUserIds = user.map((u) => u.id);
            const newUserIds = oldUserIds.includes(userId)
                ? oldUserIds.filter((id) => id !== userId) // remove
                : [...oldUserIds, userId]; // add

            editCard({
                id,
                name,
                description,
                priority,
                attachments,
                completed,
                userIds: newUserIds,
            });
        },
        [id, name, attachments, description, priority, completed, user]
    );

    const handleAttachmentsChange = useCallback(
        (_attachments: string[]) => {
            editCard({
                id,
                attachments: _attachments,
                completed,
                description,
                due,
                name,
                priority,
                userIds: user.map((u) => u.id),
            });
        },
        [
            id,
            user,
            attachments,
            comments,
            description,
            completed,
            due,
            name,
            priority,
        ]
    );

    const handleCommentsChange = useCallback(
        (_comments: IKanbanCommentPOST[]) => {
            const sanitizedComments = _comments.map((comment) => ({
                id: +comment.id!,
                messageType: comment.messageType,
                message: comment.message,
            }));

            editCard({
                id,
                attachments,
                comments: sanitizedComments,
                completed,
                description,
                due,
                name,
                priority,
                userIds: user.map((u) => u.id),
            });
        },
        [
            id,
            user,
            attachments,
            completed,
            comments,
            description,
            due,
            name,
            priority,
        ]
    );

    const { t } = useTranslation();
    // Handler to open the image modal
    const handleOpenImageModal = (image: string) => {
        setSelectedImage(image);
    };

    // Handler to close the image modal
    const handleCloseImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <Dialog
            open
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    minHeight: "80vh", // Adjust the height as needed
                    borderRadius: 2,
                    padding: 2,
                },
            }}
        >
            <KanbanDetailsToolbar
                taskName={name}
                fileInputRef={fileInputRef}
                liked={liked}
                completed={completed}
                onLike={handleLiked}
                onAttach={handleClickAttach}
                onDelete={onDeleteTask}
                onCompleted={toggleCompleted}
                onCloseDetails={onClose}
            />
            <Divider />

            <Stack spacing={3} sx={{ pt: 3, pb: 5 }}>
                {/* Task name */}
                <Box sx={{ px: 2.5 }}>
                    <StyledLabel sx={{ height: 20, lineHeight: "20px" }}>
                        {t("Task name")}
                    </StyledLabel>
                    <Name taskName={name} onUpdate={handleUpdate} />
                </Box>

                {/* Assignee and priority*/}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2.5 }}
                >
                    <Stack direction="row" alignItems="center" ml={2}>
                        <StyledLabel
                            sx={{ height: 40, lineHeight: "40px", my: 0.5 }}
                        >
                            {t("Assignee")}
                        </StyledLabel>

                        <KanbanContactsDialog
                            assignees={task.user}
                            toggleAssignee={handleToggleAssignee}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" mr={2}>
                        <Typography
                            fontSize="13px"
                            color="text.secondary"
                            sx={{ flexShrink: 0, mr: 1 }}
                        >
                            {t("Priority")}
                        </Typography>

                        <KanbanDetailsPrioritizes
                            priority={priority}
                            onChangePrioritize={handleChangePriority}
                        />
                    </Stack>
                </Stack>

                {/* Description */}
                <Box sx={{ px: 2.5 }}>
                    <Description
                        taskDescription={description}
                        onUpdate={handleUpdate}
                        onClose={onClose}
                    />
                </Box>

                {/* Attachments */}
                <Box sx={{ px: 2.5 }}>
                    <Stack direction="row" alignItems="center">
                        <Typography
                            fontSize="13px"
                            color="text.secondary"
                            sx={{ flexShrink: 0, mr: 2 }}
                        >
                            {t("Attachments")}
                        </Typography>

                        <KanbanDetailsAttachments
                            attachments={task.attachments}
                            onChange={handleAttachmentsChange}
                        />
                    </Stack>
                    {task.attachments.length > 0 ? <Divider /> : null}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            px: 2.5,
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 5,
                            mt: 2, // Space between label and attachment thumbnails
                            maxHeight: "200px",
                            overflowY: "auto",
                            padding: 1,
                            "&::-webkit-scrollbar": {
                                height: "2px",
                                width: "9px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: scrollbarColor,
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: scrollbarHoverColor,
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: scrollbarTrackColor,
                            },
                        }}
                    >
                        {task.attachments.map((attachment, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: "relative",
                                    width: "120px",
                                    height: "auto",
                                }}
                            >
                                <Typography
                                    textAlign="center"
                                    variant="body2"
                                    fontWeight={500}
                                    sx={{ mb: 1 }}
                                >
                                    {t("attachment")} {index + 1}
                                </Typography>
                                <img
                                    alt={`attachment-${index + 1}`}
                                    src={attachment}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                        borderRadius: "8px",
                                        transition: "opacity 0.3s ease",
                                        opacity: task.completed ? 0.48 : 1,
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleOpenImageModal(attachment)
                                    }
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Stack>
            <Box sx={{ px: 2.5 }}>
                <Divider sx={{ mb: 1, mt: -3 }} />
                <StyledLabel>{t("Comments inbox")}</StyledLabel>
                {!!task.comments.length && (
                    <KanbanDetailsCommentList comments={task.comments} />
                )}
                <KanbanDetailsCommentInput
                    comments={comments}
                    onChange={handleCommentsChange}
                    cardId={task.id}
                />
            </Box>

            {/* Image Modal */}
            <Dialog
                open={Boolean(selectedImage)}
                onClose={handleCloseImageModal}
                maxWidth="md"
            >
                <DialogTitle>
                    <Typography>{t("Attachment Preview")}</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseImageModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <img
                        src={selectedImage || ""}
                        style={{ width: "100%", height: "auto" }}
                    />
                </DialogContent>
            </Dialog>
        </Dialog>
    );
}
