import { useCallback, useRef, useState } from "react";
// @mui
import { Avatar, Divider, Drawer, Stack, Button } from "@mui/material";
// @types
import {
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanComment,
    IKanbanCommentPOST,
} from "src/types/kanban";
// components
import { Scrollbar } from "src/components/scrollbar";
// Kanban
import KanbanContactsDialog from "../KanbanContactsDialog";
import KanbanDetailsAttachments from "./KanbanDetailsAttachments";
import KanbanDetailsCommentInput from "./KanbanDetailsCommentInput";
import KanbanDetailsCommentList from "./KanbanDetailsCommentList";
import KanbanDetailsPrioritizes from "./KanbanDetailsPrioritizes";
import KanbanDetailsToolbar from "./KanbanDetailsToolbar";
import { useEditCardMutation } from "src/services/tickets";
import { StyledLabel } from "./styled";
import Description from "./Description";
import Name from "./Name";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
    task: IKanbanCard;
    openDetails: boolean;
    onCloseDetails: VoidFunction;
    onDeleteTask: VoidFunction;
};

export default function KanbanDetails({
    task,
    openDetails,
    onCloseDetails,
    onDeleteTask,
}: Props) {
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

    const fileInputRef = useRef<HTMLInputElement>(null);

    // TODO:
    // const {
    //     startDate,
    //     endDate,
    //     onChangeStartDate,
    //     onChangeEndDate,
    //     open: openPicker,
    //     onOpen: onOpenPicker,
    //     onClose: onClosePicker,
    //     isSelected: isSelectedValuePicker,
    //     isError,
    //     shortLabel,
    // } = useDateRangePicker(new Date(task.due[0]), new Date(task.due[1]));

    const [editCard] = useEditCardMutation();

    const handleLiked = useCallback(() => setLiked((old) => !old), []);
    const handleClickAttach = () => fileInputRef.current?.click();

    const handleUpdate = useCallback(
        (card: Partial<IKanbanCardPOST>) =>
            editCard({
                id,
                name,
                description,
                priority,
                completed,
                userIds: user.map((u) => u.id),
                // updated fields from a component:
                ...card,
            }),
        [id, name, description, priority, completed, user]
    );

    const toggleCompleted = useCallback(
        () =>
            editCard({
                id,
                name,
                description,
                priority,
                completed: !completed,
                userIds: user.map((u) => u.id),
            }),
        [id, name, description, priority, completed, user]
    );

    const handleChangePriority = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            editCard({
                id,
                name,
                description,
                priority: +event.target.value,
                completed,
                userIds: user.map((u) => u.id),
            }),
        [id, name, description, completed, user]
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
                completed,
                userIds: newUserIds,
            });
        },
        [id, name, description, priority, completed, user]
    );

    const handleAttachmentsChange = useCallback(
        (_attachments: string[]) => {
            editCard({
                id,
                attachments: _attachments,
                comments,
                completed,
                description,
                due,
                name,
                priority,
                userIds: user.map((u) => u.id),
            });
        },
        [id, user, comments, description, completed, due, name, priority]
    );

    const handleCommentsChange = useCallback(
        (_comments: IKanbanCommentPOST[]) => {
            editCard({
                id,
                attachments,
                comments: _comments as IKanbanComment[],
                completed,
                description,
                due,
                name,
                priority,
                userIds: user.map((u) => u.id),
            });
        },
        [id, user, attachments, completed, description, due, name, priority]
    );

    const { t } = useTranslation();

    return (
        <Drawer
            open={openDetails}
            onClose={onCloseDetails}
            anchor="right"
            PaperProps={{
                sx: {
                    height: "calc(100% - 60px)",
                    top: "60px",
                    width: {
                        xs: 1,
                        sm: 480,
                    },
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
                onCloseDetails={onCloseDetails}
            />
            <Divider />
            <Scrollbar>
                <Stack spacing={3} sx={{ px: 2.5, pt: 3, pb: 5 }}>
                    {/* Task name */}
                    <Name taskName={name} onUpdate={handleUpdate} />

                    {/* Assignee */}
                    <Stack direction="row">
                        <StyledLabel
                            sx={{ height: 40, lineHeight: "40px", my: 0.5 }}
                        >
                            {t("Assignee")}
                        </StyledLabel>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            {task.user.map((user) => (
                                <Avatar
                                    key={user.id}
                                    alt={user.username}
                                    src={user.profilePhoto}
                                    sx={{ m: 0.5 }}
                                />
                            ))}

                            <KanbanContactsDialog
                                assignees={task.user}
                                toggleAssignee={handleToggleAssignee}
                            />
                        </Stack>
                    </Stack>

                    {/* Due date */}
                    {/* <Stack direction="row" alignItems="center">
                        <StyledLabel> Due date </StyledLabel>
                        <>
                            {isSelectedValuePicker ? (
                                <Box
                                    onClick={onOpenPicker}
                                    sx={{
                                        typography: "body2",
                                        cursor: "pointer",
                                        "&:hover": { opacity: 0.72 },
                                    }}
                                >
                                    {shortLabel}
                                </Box>
                            ) : (
                                <Tooltip title="Add due date">
                                    <IconButton
                                        onClick={onOpenPicker}
                                        sx={{
                                            p: 1,
                                            ml: 0.5,
                                            bgcolor: (theme) =>
                                                alpha(
                                                    theme.palette.grey[500],
                                                    0.08
                                                ),
                                            border: (theme) =>
                                                `dashed 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Iconify icon="eva:plus-fill" />
                                    </IconButton>
                                </Tooltip>
                            )}

                            <DateRangePicker
                                variant="calendar"
                                title="Choose due date"
                                startDate={startDate}
                                endDate={endDate}
                                onChangeStartDate={onChangeStartDate}
                                onChangeEndDate={onChangeEndDate}
                                open={openPicker}
                                onClose={onClosePicker}
                                isSelected={isSelectedValuePicker}
                                isError={isError}
                            />
                        </>
                    </Stack> */}

                    {/* Priority */}
                    <Stack direction="row" alignItems="center">
                        <StyledLabel>{t("Priority")}</StyledLabel>

                        <KanbanDetailsPrioritizes
                            priority={priority}
                            onChangePrioritize={handleChangePriority}
                        />
                    </Stack>

                    {/* Description */}
                    <Description
                        taskDescription={description}
                        onUpdate={handleUpdate}
                        onClose={onCloseDetails}
                    />

                    {/* Attachments */}
                    <Stack direction="row">
                        <StyledLabel sx={{ py: 0.5 }}>
                            {t("Attachments")}
                        </StyledLabel>
                        <KanbanDetailsAttachments
                            attachments={task.attachments}
                            onChange={handleAttachmentsChange}
                        />
                    </Stack>
                </Stack>

                {!!task.comments.length && (
                    <KanbanDetailsCommentList comments={task.comments} />
                )}
            </Scrollbar>
            <Divider />
            <KanbanDetailsCommentInput
                comments={comments}
                onChange={handleCommentsChange}
            />
        </Drawer>
    );
}
