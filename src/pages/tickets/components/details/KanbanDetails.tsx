import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// @mui
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// @types
import { IKanbanCard } from "src/types/kanban";
// components
import { Scrollbar } from "src/components/scrollbar";
import DateRangePicker, {
    useDateRangePicker,
} from "../../../../components/date-range-picker";
import Iconify from "../../../../components/iconify";
//
import KanbanContactsDialog from "../KanbanContactsDialog";
import KanbanInputName from "../KanbanInputName";
import KanbanDetailsAttachments from "./KanbanDetailsAttachments";
import KanbanDetailsCommentInput from "./KanbanDetailsCommentInput";
import KanbanDetailsCommentList from "./KanbanDetailsCommentList";
import KanbanDetailsPrioritizes from "./KanbanDetailsPrioritizes";
import KanbanDetailsToolbar from "./KanbanDetailsToolbar";
import { useEditCardMutation } from "src/services/tickets";

// ----------------------------------------------------------------------

const StyledLabel = styled("span")(({ theme }) => ({
    ...theme.typography.caption,
    width: 120,
    flexShrink: 0,
    color: theme.palette.text.secondary,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": { height: "100%!important" },
}));

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
    const { id, completed, priority, name, description, user } = useMemo(
        () => task,
        [task]
    );

    const [liked, setLiked] = useState(false);

    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [openAssignees, setOpenAssignees] = useState(false);

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

    const handleLiked = () => setLiked(!liked);
    const handleClickAttach = () => fileInputRef.current?.click();

    const handleChangeTaskName = (event: React.ChangeEvent<HTMLInputElement>) =>
        setTaskName(event.target.value);
    const handleChangeTaskDescription = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setTaskDescription(event.target.value);

    const toggleCompleted = useCallback(
        () =>
            editCard({
                id,
                name,
                priority,
                completed: !completed,
                userIds: user.map((u) => u.id),
            }),
        [id, name, priority, completed, user]
    );

    const handleChangePriority = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            editCard({
                id,
                name,
                priority: +event.target.value,
                completed,
                userIds: user.map((u) => u.id),
            }),
        [id, name, completed, user]
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
                priority,
                completed,
                userIds: newUserIds,
            });
        },
        [id, name, priority, completed, user]
    );

    const handleOpenAssignees = () => setOpenAssignees(true);
    const handleCloseAssignees = () => setOpenAssignees(false);

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
                taskName={task.name}
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
                    <KanbanInputName
                        placeholder="Task name"
                        value={taskName}
                        onChange={handleChangeTaskName}
                    />

                    {/* Assignee */}
                    <Stack direction="row">
                        <StyledLabel
                            sx={{ height: 40, lineHeight: "40px", my: 0.5 }}
                        >
                            Assignee
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

                            <Tooltip title="Add assignee">
                                <IconButton
                                    onClick={handleOpenAssignees}
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

                            <KanbanContactsDialog
                                assignees={task.user}
                                open={openAssignees}
                                toggleAssignee={handleToggleAssignee}
                                onClose={handleCloseAssignees}
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
                        <StyledLabel>Priority</StyledLabel>

                        <KanbanDetailsPrioritizes
                            priority={priority}
                            onChangePrioritize={handleChangePriority}
                        />
                    </Stack>

                    {/* Description */}
                    <Stack direction="row">
                        <StyledLabel> Description </StyledLabel>

                        <StyledTextField
                            fullWidth
                            multiline
                            size="small"
                            value={taskDescription}
                            onChange={handleChangeTaskDescription}
                            InputProps={{
                                sx: {
                                    typography: "body2",
                                },
                            }}
                        />
                    </Stack>

                    {/* Attachments */}
                    <Stack direction="row">
                        <StyledLabel sx={{ py: 0.5 }}>Attachments</StyledLabel>
                        <KanbanDetailsAttachments
                            attachments={task.attachments}
                        />
                    </Stack>
                </Stack>

                {!!task.comments.length && (
                    <KanbanDetailsCommentList comments={task.comments} />
                )}
            </Scrollbar>

            <Divider />

            <KanbanDetailsCommentInput />
        </Drawer>
    );
}
