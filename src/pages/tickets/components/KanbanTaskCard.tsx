import { useState } from "react";
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
import { useTheme } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
    index: number;
    card: IKanbanCard;
    onDeleteTask: (id: number) => void;
};

export default function KanbanTaskCard({ card, onDeleteTask, index }: Props) {
    const { id, name, attachments, completed, priority, user } = card || {};
    const theme = useTheme();
    const [editCard] = useEditCardMutation();

    const [openDetails, setOpenDetails] = useState(false);
    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    const handleChangeComplete = () =>
        editCard({
            id,
            name,
            priority,
            completed: !completed,
            userIds: user.map((u) => u.id),
        });
    const scrollbarColor = theme.palette.mode === "dark" ? "#444" : "#bbb";
    const scrollbarHoverColor = theme.palette.mode === "dark" ? "#666" : "#888";
    const scrollbarTrackColor =
        theme.palette.mode === "dark" ? "#222" : "#f1f1f1";

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

                            boxShadow:
                                "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
                            "&:hover": {
                                boxShadow:
                                    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
                            },

                            display: "flex",
                            flexDirection: "row",

                            cursor: "pointer",
                        }}
                        onClick={handleOpenDetails}
                    >
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
                        />

                        <Box
                            sx={{
                                flexGrow: 1,
                                // overflow: "clip",
                                maxHeight: "170px",
                                overflowX: "hidden",
                                overflowY: "auto",
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
                            <Typography
                                variant="body1"
                                sx={{
                                    height: 72,
                                    lineHeight: "72px",
                                    fontSize: "12px",
                                    width: "200px",
                                    overflow: "ellipsis",
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
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    "& > *:not(:last-child)": {
                                        marginBottom: "-34px", // Reduce space between the images
                                    },
                                    // Add a small gap between images (you can adjust this value)
                                }}
                            >
                                {attachments
                                    .slice(0, 3)
                                    .map((attachment, index) => (
                                        <Image
                                            key={index}
                                            alt={`attachment-${index}`}
                                            src={attachment}
                                            ratio="4/3"
                                            sx={{
                                                height: "70px",
                                                width: "230px",
                                                transition: (theme) =>
                                                    theme.transitions.create(
                                                        "opacity",
                                                        {
                                                            duration:
                                                                theme
                                                                    .transitions
                                                                    .duration
                                                                    .shortest,
                                                        }
                                                    ),
                                                ...(completed && {
                                                    opacity: 0.48,
                                                }),
                                            }}
                                        />
                                    ))}
                            </Box>
                        </Box>
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
