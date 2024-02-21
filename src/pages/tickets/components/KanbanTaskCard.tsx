import { ChangeEvent, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// @mui
import { Box, Checkbox, Paper, Typography } from "@mui/material";
// @types
import { IKanbanCard } from "src/types/kanban";
// components
import Iconify from "src/components/iconify";
import Image from "src/components/image";
//
import KanbanDetails from "./details/KanbanDetails";
import { useEditCardMutation } from "src/services/tickets";

// ----------------------------------------------------------------------

type Props = {
    index: number;
    card: IKanbanCard;
    onDeleteTask: (id: number) => void;
};

export default function KanbanTaskCard({ card, onDeleteTask, index }: Props) {
    const { id, name, attachments, completed, priority, user } = card;

    const [editCard] = useEditCardMutation();

    const [openDetails, setOpenDetails] = useState(false);

    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    const handleChangeComplete = (event: ChangeEvent<HTMLInputElement>) =>
        editCard({
            id,
            name,
            priority,
            completed: !completed,
            userIds: user.map((u) => u.id),
        });

    if (!card) return null;

    return (
        <>
            <Draggable
                draggableId={`task-${card.id}`}
                key={`task-${card.id}`}
                index={index}
            >
                {(provided) => (
                    <Paper
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        sx={{
                            width: 1,
                            borderRadius: 1,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow:
                                "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
                            "&:hover": {
                                boxShadow:
                                    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
                            },
                        }}
                    >
                        <Box
                            onClick={handleOpenDetails}
                            sx={{ cursor: "pointer" }}
                        >
                            {!!attachments.length && (
                                <Image
                                    disabledEffect
                                    alt={attachments[0]}
                                    src={attachments[0]}
                                    ratio="4/3"
                                    sx={{
                                        transition: (theme) =>
                                            theme.transitions.create(
                                                "opacity",
                                                {
                                                    duration:
                                                        theme.transitions
                                                            .duration.shortest,
                                                }
                                            ),
                                        ...(completed && {
                                            opacity: 0.48,
                                        }),
                                    }}
                                />
                            )}

                            <Typography
                                noWrap
                                variant="subtitle2"
                                sx={{
                                    pr: 1,
                                    pl: 6,
                                    height: 72,
                                    lineHeight: "72px",
                                    transition: (theme) =>
                                        theme.transitions.create("opacity", {
                                            duration:
                                                theme.transitions.duration
                                                    .shortest,
                                        }),
                                    ...(completed && {
                                        opacity: 0.48,
                                    }),
                                }}
                            >
                                {name}
                            </Typography>
                        </Box>

                        <Checkbox
                            disableRipple
                            checked={completed}
                            icon={
                                <Iconify icon="eva:radio-button-off-outline" />
                            }
                            checkedIcon={
                                <Iconify icon="eva:checkmark-circle-2-outline" />
                            }
                            onChange={handleChangeComplete}
                            sx={{ position: "absolute", bottom: 16, left: 8 }}
                        />
                    </Paper>
                )}
            </Draggable>

            <KanbanDetails
                task={card}
                openDetails={openDetails}
                onCloseDetails={handleCloseDetails}
                onDeleteTask={() => onDeleteTask(card.id)}
            />
        </>
    );
}
